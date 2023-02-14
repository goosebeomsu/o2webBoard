package o2.o2web.dto;

import lombok.Getter;

@Getter
public class Message {

    private String MESSAGE;
    private boolean SUCCESS;

    public Message(String MESSAGE) {
        this.MESSAGE = MESSAGE;
    }

    public Message(boolean SUCCESS) {
        this.SUCCESS = SUCCESS;
    }

    public Message(String MESSAGE, boolean SUCCESS) {
        this.MESSAGE = MESSAGE;
        this.SUCCESS = SUCCESS;
    }
}
