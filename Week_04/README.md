### 学习笔记

---

## 语言分类

---

-   非形式语言
    -   中文、英文
-   形式语言
    -   乔姆斯基谱系
        -   0 型 无限制文法
        -   1 型 上下文相关文法
        -   2 型 上下文无关文法
        -   3 型 正则文法
    -   用途分类
        -   数据描述语言
        -   编程语言
    -   表达方式
        -   声明式语言
        -   命令式语言
            -   Atom 原子级
            -   Expression 表达式
            -   Statement 语句
            -   Structure 结构化
            -   Program => module package library
-   图灵完备性 goto if/while lambda
-   动态和静态 Runtime Compiletime
-   类型系统
    -   动态类型
    -   静态类型
    -   强类型
    -   弱类型
    -   复合类型
        -   函数签名
        -   结构体
    -   子类型
    -   泛型
-   产生式 BNF

    -   巴克斯诺尔范式
    -   用尖括号括起来的的名称来表示语法结构名
    -   基础结构 终结符 Terminal Symbol
    -   用其他结构定义的复合结构 非终结符 Nonterminal Symbol
    -   用字符串来表示终结符
    -   可以用括号
    -   \* 重复多次
    -   \| 或
    -   \+ 至少一次
    -   js \*\* 右结合

---

### JavaScript

---

-   Atom
    -   Grammer
        -   Literal Variable Keywords WhiteSpace LineTerminator
    -   Runtime
        -   Types
        -   Execution Context
    -   Number
    -   String
        -   code point 码点
    -   Boolean
    -   null
    -   undefined 不是关键字
        -   void 0
    -   Object
        -   归类
        -   分类
        -   Prototype
        -   在设计对象的行为和状态时，我们总是遵循'行为改变状态'的原则
        -   唯一性 内存地址
        -   数据属性
        -   访问器属性
        -   Function
    -   Symbol
