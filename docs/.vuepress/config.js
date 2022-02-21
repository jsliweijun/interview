module.exports = {
    base: '/interview/',
    dest: 'dist',
    title: '面试',
    description: '面试问题',
    themeConfig: {
        logo: '/assets/img/interview.png',
        displayAllHeaders: false,
        editLinks: false,
        sidebarDepth: 5,
        docsDir: 'docs',
        // header组件的菜单栏配置
        nav: [
            {
                text: '面试环节',
                link: '/c00-prepare/'
            },
            {
                text: 'HTML5',
                link: '/c01-html5/'
            },
            {
                text: 'CSS3',
                link: '/c02-css3/'
            },
            {
                text: 'JavaScript(ES6+)',
                link: '/c03-javascript-es6+/'
            },
            {
                text: '计算机网络',
                link: '/c04-network/'
            },
            {
                text: 'Vue',
                link: '/c05-vue/'
            },

            {
                text: '更多',
                items: [
                    {
                        text: '前端工程化',
                        link: '/c06-fe-project/'
                    },
                    {
                        text: 'Node',
                        link: '/c07-node/'
                    },
                    {
                        text: '数据结构',
                        link: '/c08-data-structure/'
                    },
                    {
                        text: '算法',
                        link: '/c09-algorithm/'
                    },
                    {
                        text: '设计模式',
                        link: '/c10-design-pattern/'
                    },
                    {
                        text: 'TypeScript',
                        link: '/c11-typescript/'
                    },
                    {
                        text: 'Web 安全',
                        link: '/c12-web-security/'
                    }
                ]
            },
            {
                text: 'GitHub',
                link: 'https://github.com/jsliweijun/interview'
            }
        ],
        // 侧边栏，多个侧边栏配置
        sidebar: {
            '/c00-prepare/': ['', 's01', 's02', 's03'],
            '/c01-html5/': ['', 's01']
        }
    }
};
