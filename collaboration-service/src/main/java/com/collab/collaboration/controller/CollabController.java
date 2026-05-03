package com.collab.collaboration.controller;

import com.collab.collaboration.model.Drawing;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class CollabController {

    @MessageMapping("/drawing")
    @SendTo("/topic/drawings")
    public Drawing handleDrawing(Drawing drawing) {
        // Broadcast drawing to all connected users
        System.out.println("Drawing received: " + drawing.getX() + "," + drawing.getY());
        return drawing;
    }

    @MessageMapping("/clear")
    @SendTo("/topic/clear")
    public String handleClear() {
        // Clear canvas for all users
        return "CLEAR_CANVAS";
    }
}
