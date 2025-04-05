require('dotenv').config();
const { ChatOpenAI } = require('@langchain/openai');
const { ConversationChain } = require('langchain/chains');
const { BufferMemory } = require('langchain/memory');
const { PromptTemplate } = require('@langchain/core/prompts');
const Conversation = require('../models/converse');

class FinancialAdvisorChatbot {
  constructor(modelName = "gpt-3.5-turbo", temperature = 0.7) {
    this.chatModel = new ChatOpenAI({
      modelName: modelName,
      temperature: temperature,
      maxTokens: 500,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    // Create a memory instance
    this.memory = new BufferMemory({
      returnMessages: true,
      memoryKey: "chat_history",
      inputKey: "input",
    });

    // Define the financial advisor prompt template
    const financialAdvisorPrompt = PromptTemplate.fromTemplate(`
      You are a helpful and knowledgeable financial advisor assistant. Your name is FinBot.
      
      Your responsibilities include:
      - Providing personalized financial advice
      - Explaining financial concepts in simple terms
      - Helping with budgeting, investing, and financial planning
      - Recalling previous conversations to maintain context
      - Being polite, professional, and supportive
      
      Always introduce yourself as FinBot on first interaction. Never suggest specific stocks or make promises about returns.
      Always clarify that you provide general advice and users should consult a certified financial advisor for specific investment decisions.
      
      Previous conversation history:
      {chat_history}
      
      Human: {input}
      AI: `);

    this.conversation = new ConversationChain({
      llm: this.chatModel,
      memory: this.memory,
      prompt: financialAdvisorPrompt,
      verbose: process.env.NODE_ENV === 'development',
    });
  }

  async chat(userInput, userId = 'default') {
    try {
      console.log(`User ${userId}: ${userInput}`);

      // Load conversation history into memory if available
      await this.loadConversationHistory(userId);

      // Call the chatbot to get a response
      const response = await this.conversation.call({ input: userInput });

      // Log the outgoing response
      console.log(`FinBot: ${response.response}`);

      // Save both user input and chatbot response to the database
      await this.saveMessageToDB(userId, 'user', userInput);
      await this.saveMessageToDB(userId, 'bot', response.response);

      return response.response;
    } catch (error) {
      console.error("Chatbot Error:", error);
      return "I apologize, but I'm having trouble processing your request right now. Could you try again in a moment?";
    }
  }

  // Save message to the database
  async saveMessageToDB(userId, role, message) {
    try {
      let conversation = await Conversation.findOne({ userId });

      if (!conversation) {
        conversation = await Conversation.create({
          userId,
          messages: [{
            role,
            message,
            timestamp: new Date(),
          }],
          createdAt: new Date(),
        });
      } else {
        conversation.messages.push({
          role,
          message,
          timestamp: new Date(),
        });
        await conversation.save();
      }

      console.log(`Message saved to database for user ${userId}`);
    } catch (error) {
      console.error("Error saving message to database:", error);
    }
  }

  // Load conversation history from the database into memory
  async loadConversationHistory(userId) {
    try {
      const conversation = await Conversation.findOne({ userId });
      if (conversation) {
        this.memory.chat_history = conversation.messages.map((msg) => ({
          role: msg.role === 'user' ? 'Human' : 'AI',
          content: msg.message,
        }));
        console.log(`Loaded conversation history for user ${userId}`);
      }
    } catch (error) {
      console.error("Error loading conversation history:", error);
    }
  }

  // Method to clear the conversation memory
  clearMemory() {
    this.memory.clear();
    return "Conversation history has been cleared.";
  }
  // Method to save the conversation history to a file or database
  async saveConversationHistory(userId) {
    try {
      const history = await this.memory.loadMemoryVariables({});
      console.log(`Saving conversation history for user ${userId}`);
      return history;
    } catch (error) {
      console.error("Error saving conversation history:", error);
    }
  }
}

module.exports = FinancialAdvisorChatbot;
