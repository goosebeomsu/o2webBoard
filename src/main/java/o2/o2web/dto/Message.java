package o2.o2web.dto;

import lombok.Getter;

@Getter
public class Message {

    private String message;

    public Message(String message) {
        this.message = message;
    }
}
