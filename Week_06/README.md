### 浏览器的工作原理

---

-   Toy-Browser
    -   url => html => dom => dom with css => dom with position => bitmap
-   有限状态机 Finite state machine
    -   每一个状态都是一个机器
    -   每个机器知道下一个状态
        -   Moore
        -   Mealy
            -   根据输入来决定状态
    -   state => init status
        -   输入 => 下一个状态函数
    -   reConsume
        -   解决 字符 漏掉的状态
-   ISO-OSI 七层网络模型
