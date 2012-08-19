{{#each entry}}
    <div class="item">
        <div class="pic">
            <a title="大设计" href="http://book.douban.com/subject/5422665/" class="nbg">
                <img alt="大设计" src="http://img3.douban.com/spic/s4635935.jpg">
            </a>
        </div>
        <div class="info">
            <ul>
                <li class="title">
                    <a href="http://book.douban.com/subject/5422665/">
                        <em>{{title.$t}}</em>
                    </a>
                </li>
                    <li class="intro">[英] 斯蒂芬·霍金 / 吴忠超 / 湖南科学技术出版社 / 2011-1 / 48.00元</li>
                <li>
                    <span class="rating4-t"></span>
                    <span class="date">{{updated}}</span>
                </li>
            </ul>
        </div>
    </div>
{{/each}}