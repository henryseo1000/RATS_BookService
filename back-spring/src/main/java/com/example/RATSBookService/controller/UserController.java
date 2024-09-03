package com.example.RATSBookService.controller;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    String name = "hello!";
    String value = "값";

    @RequestMapping("/{num}")
    public String index(@PathVariable int num){
        int res = 0;
        for(int i = 0; i <= num; i++){
            res += i;
        }
        return "total: " + res;
    }

    @RequestMapping("/id{id}")
    public DataObject indexing(@PathVariable int id){
        return new DataObject(id, name, value);
    }

    @Getter
    @Setter
    class DataObject{
        private int id;
        private String name;
        private String value;

        public DataObject(int id, String name, String value){
            super();
            this.id = id;
            this.name = name;
            this.value = value;
        }
    }

}
