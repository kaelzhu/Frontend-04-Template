## 学习笔记

---

### 寻路算法 bfs

---

-   Array (push pop unshift shift)

    -   队列 queue
    -   栈 stack dfs

-   算法数据可视化

    -   aysnc/await 实现

-   bfs 广搜

    > 用一个新的 array 存储当前节点的前一个节点坐标

    > 一个节点周围能够到达的节点依次入队, 找到最后一个节点后, 反推路径， 在有障碍物的情况下不一定是最短的

    > 每次都找最佳节点 => A\*

-   Dijkstra 算法

-   启发式寻路 估值函数

    > 有最优解 A\*

        -	sorted方法来实现有序的数据结构
        	- 堆 heap 二叉堆
            	- 最小堆
            	- 插入、删除 O(logN) 查询O(N) 取最大(小)值 O(1)
        	- 二叉树 binary tree
        	- winner tree

        -   open_set 未遍历
        -   close_set 已遍历

        -   F = G(从起点计算的移动代价) + H(到终点的移动代价估值, 试探法)
            -   H
                -	Manhattan法 忽略斜线移动 忽略障碍
                	-  数移动的格数
            -   G
                -   更小的 G 值

    > 不一定有最佳路径 A

---

### AST 抽象语法树

---

-   词法分析 分词
    -   TokenNumber 0-9
    -   Operator + - \* /
    -   Whitespace SP
    -   LineTerminator LF CR
    -   Expression 产生式
        -   AdditiveExpression
            -   单独一个乘法也是加法
            -   MultiplicativeExpression | AdditiveExpression +|- MultiplicativeExpression
        -   MultiplicativeExpression
            -   单独一个数也是乘法
            -   Number | MultiplicativeExpression (\*|/) Number
        -   Number
        -   EOF
        -   终结符 直接从词法中扫描出来的 terminal symbol
        -   非终结符 组合出来的 none terminal symbol
-   语法分析
-   LL(left left) 算法
-   LR 算法

> 四则运算
