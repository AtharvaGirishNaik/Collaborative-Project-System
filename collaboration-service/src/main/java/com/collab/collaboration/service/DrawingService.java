package com.collab.collaboration.service;

import com.collab.collaboration.model.Drawing;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class DrawingService {
    
    private final RedisTemplate<String, Object> redisTemplate;
    
    public DrawingService(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }
    
    public void saveDrawing(String sessionId, Drawing drawing) {
        String key = "drawings:" + sessionId;
        redisTemplate.opsForList().rightPush(key, drawing);
    }
    
    public List<Drawing> getDrawings(String sessionId) {
        String key = "drawings:" + sessionId;
        return redisTemplate.opsForList().range(key, 0, -1);
    }
    
    public void clearDrawings(String sessionId) {
        String key = "drawings:" + sessionId;
        redisTemplate.delete(key);
    }
}
