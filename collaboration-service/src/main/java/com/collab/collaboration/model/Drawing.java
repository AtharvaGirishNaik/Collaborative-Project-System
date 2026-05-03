package com.collab.collaboration.model;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class Drawing {
    @NotNull
    private Double x;
    @NotNull
    private Double y;
    @NotNull
    private String color;
    @Min(1)
    private Double size;

    // Default constructor
    public Drawing() {}

    public Drawing(Double x, Double y, String color, Double size) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
    }

    // Getters & Setters
    public Double getX() { return x; }
    public void setX(Double x) { this.x = x; }
    public Double getY() { return y; }
    public void setY(Double y) { this.y = y; }
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
    public Double getSize() { return size; }
    public void setSize(Double size) { this.size = size; }
}
