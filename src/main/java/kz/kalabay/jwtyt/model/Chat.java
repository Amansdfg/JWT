package kz.kalabay.jwtyt.model;

import java.time.LocalDateTime;
public abstract class Chat {
    protected  Chat(){}
    public abstract Long getId();
    public abstract void setId(Long id);
    public abstract String getChatStatus();
    public abstract void setChatStatus(String chatStatus);
    public abstract User getSender();
    public abstract void  setSender(User user);
    public abstract String  getText();
    public abstract void  setText(String text);

    public abstract LocalDateTime getDate();
    public abstract void  setDate(LocalDateTime date);
}
