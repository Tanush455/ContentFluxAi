import Redis from "ioredis";

export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

class AiRedisManager {
    private static instance: AiRedisManager;
    private redis: Redis;

    private constructor() {
        this.redis = new Redis(process.env.REDIS_URL as string);
    }

    public static getInstance(): AiRedisManager {
        if (!AiRedisManager.instance) {
            AiRedisManager.instance = new AiRedisManager();
        }
        return AiRedisManager.instance;
    }

    // 1. Get Chat History
    public async getHistory(userId: string, tenantId: string): Promise<ChatMessage[]> {
        const key = `ai-memory:${tenantId}:${userId}`;
        const data = await this.redis.lrange(key, 0, -1);

        return data.map(item => JSON.parse(item));
    }

    // 2. Add Message to History
    public async addMessage(userId: string, tenantId: string, message: ChatMessage) {
        const key = `ai-memory:${tenantId}:${userId}`;

        await this.redis.rpush(key, JSON.stringify(message));

        await this.redis.ltrim(key, -10, -1);

        await this.redis.expire(key, 86400);
    }
    public async clearHistory(userId: string, tenantId: string) {
        const key = `ai-memory:${tenantId}:${userId}`;
        await this.redis.del(key);
    }
}

export default AiRedisManager;