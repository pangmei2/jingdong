//封装获取元素
function $(ele) {
  return document.querySelector(ele);
}

//功能1：关闭广告条
// let close = document.querySelector('.close');
// let close = $('.close');
// let jdTop =document.querySelector('.top');
$(".close").onclick = function () {
  $(".top").style.display = "none";
};

//功能2：搜索框里面动态内容
//思路：1.准备容器存储显示的内容 数组存  2. 数据动态改变 计时器  3. 设置input内容
let input = document.querySelector("#input");
(function () {
  let searchArr = [
    "电脑主机",
    "海尔冰箱",
    "iphone14",
    "平板2022",
    "华为手机",
    "手机",
    "服饰",
  ];
  let i = -1;
  setInterval(function () {
    i++;
    if (i === searchArr.length) {
      i = 0;
    }
    //设置input
    input.placeholder = searchArr[i];
  }, 1000);
})();

//功能3：模糊查询
//思路：1. 准备容器假定被搜索的内容 2.获取输入框里面的值  3.获取的输入的值 和 准备的数组里面的每一项内容比较 查看是否存在
(function () {
  let list = [
    "手机",
    "华为手机",
    "苹果手机",
    "电脑",
    "平板电脑",
    "联想电脑",
    "华为电脑",
    "小米手机",
    "三星手机",
    "手提袋",
  ];

  let ulList = document.querySelector(".list");
  //oninput事件 获取输入的内容
  input.oninput = function () {
    //获取输入的值
    let val = input.value; //trim()
    //判断：输入的值为空
    if (val == "" || val == " ") {
      //先清空数据
      ulList.innerHTML = "";
      //显示下拉层
      ulList.style.display = "none";
      return;
    }
    //先清空数据
    ulList.innerHTML = "";
    //显示下拉层
    ulList.style.display = "block";
    //遍历数组、
    for (let i = 0; i < list.length; i++) {
      console.log("-------", ulList.innerHTML, val);
      //获取数组的每一项 查看是否有字段val
      if (list[i].indexOf(val) !== -1) {
        ulList.innerHTML = ulList.innerHTML + `<li>${list[i]}</li>`;
      }
    }
    if (ulList.innerHTML == "") {
      ulList.innerHTML = "查无数据";
    }
  };
  //失去焦点
  input.onblur = function () {
    //显示下拉层
    ulList.style.display = "none";
  };
  input.onfocus = function () {
    if (input.value == "") {
      ulList.style.display = "none";
      return;
    }
    //显示下拉层
    ulList.style.display = "block";
  };
})();
//功能4：轮播图
/* 
    1. 创建容器 存储img路径 let imgArr=['./images/1.jpg','','']
    2. 计时器 
    3. 控制下标 i++ 获取不同的img路径 赋值给img标签 --轮播图修改了  控制轮播点高亮
    4. 左右按钮控制轮播
    5. 轮播点控制轮播
*/
(function () {
  let imgArr = [
    "./images/1.jpg",
    "./images/2.jpg",
    "./images/3.jpg",
    "./images/4.jpg",
    "./images/5.jpg",
    "./images/6.jpg",
  ];
  let i = 0;
  let img = document.querySelector("#img");
  let lis = document.querySelectorAll(".banner-dian>li");
  let next = document.querySelector(".next");
  let prev = document.querySelector(".prev");
  let banner = document.querySelector(".banner");
  function bannerPlay() {
    i++;
    if (i === imgArr.length) {
      i = 0;
    }
    // console.log("---下标---", i); //0--5
    //显示图片
    img.src = imgArr[i];
    //清空其他轮播点高亮
    lis.forEach((ele) => {
      ele.className = "";
    });
    //给当前的轮播点高亮
    lis[i].className = "active";
  }
  let timer = setInterval(bannerPlay, 3000);
  //鼠标移动到轮播上 计时器停止
  banner.onmouseover = function () {
    clearInterval(timer);
  };
  //鼠标离开 计时器开始
  banner.onmouseout = function () {
    timer = setInterval(bannerPlay, 3000);
  };
  //下一页
  next.onclick = function () {
    bannerPlay();
  };
  //上一页
  prev.onclick = function () {
    i -= 2;
    if (i == -2) {
      i = imgArr.length - 2;
    }
    bannerPlay();
  };

  //点击轮播点---切换轮播图
  for (let j = 0; j < lis.length; j++) {
    lis[j].onclick = function () {
      console.log("------点击li----");
      //清空其他轮播点高亮
      lis.forEach((ele) => {
        ele.className = "";
      });
      //高亮
      lis[j].className = "active";
      img.src = imgArr[j];
      //存储下标j
      i = j;
    };
  }
})();

//功能5：楼宇导航
/* 
  1. 获取元素 京东秒杀...  元素距离文档顶部的高度 offsetTop
  2. 触发浏览器滚动事件  获取浏览器滚动的高度
  3. 滚动的高度和当前的元素距离文档顶部的高度 对比  当前文档距离顶高度 <滚动高度<下一个文档距离顶高度 当前高亮
  4. 滚动到一定高度的时候 右侧楼宇导航--定位固定位置 --上移 
  5. 点击楼宇导航的  切换主体内容
*/
//获取主体内容item
let items = document.querySelectorAll(".main>.item");
let eleA = document.querySelectorAll(".louceng>a");
let louceng = document.querySelector(".louceng");
let go_Top = document.querySelector("#go-top");
//封装方法--去掉楼宇导航高亮色
function clear() {
  eleA.forEach((ele) => {
    ele.className = "";
  });
}
//定义数组存储主体内容 距离顶部的高度
let floor = [];
items.forEach((ele) => {
  floor.push(ele.offsetTop);
});
// console.log('元素自身的高度',items[3].clientHeight);

let searchTop = document.querySelector("#search-top");

//触发浏览器滚动事件
window.onscroll = function () {
  //获取浏览器滚动的高度
  let top =
    (document.documentElement.scrollTop || document.body.scrollTop) + 50;
  // 滚动到一定高度的时候 右侧楼宇导航--定位固定位置 --上移
  if (top >= 200) {
    louceng.style.top = "100px";
  } else {
    louceng.style.top = "700px";
  }
  //滚动的高度和当前的元素距离文档顶部的高度 对比
  if (top < floor[0]) {
    clear();
  } else if (top >= floor[0] && top < floor[1]) {
    clear();
    eleA[0].className = "active";
  } else if (top >= floor[1] && top < floor[2]) {
    clear();
    eleA[1].className = "active";
  } else if (top >= floor[2] && top < floor[3]) {
    clear();
    eleA[2].className = "active";
  } else if (top >= floor[3] && top < floor[3] + items[3].clientHeight) {
    clear();
    eleA[3].className = "active";
  } else if (top >= floor[3] + items[3].clientHeight) {
    eleA[3].className = "";
  }

  //--返回顶部显示-----------------------------
  if (top > 1000) {
    go_Top.style.display = "block";
  } else {
    go_Top.style.display = "none";
  }
  //吸顶----------------------------------
  //滚动到京东秒杀 或者自己定义值 大概一屏内容
  if (top >= 800) {
    searchTop.className = "search-fixed";
    searchTop.style.top = "0";
  } else {
    searchTop.className = "";
    searchTop.style.top = "-52px";
  }
};

//点击楼宇导航---切换主体内容(滚动到对应的内容上---滚动的告诉修改=主体内容距离文档高度)
for (let i = 0; i < eleA.length; i++) {
  eleA[i].onclick = function () {
    //点击可以获取下标i
    document.documentElement.scrollTop = floor[i];
  };
}

//功能6：点击返回顶部
go_Top.onclick = function () {
  document.documentElement.scrollTop = 0;
};

//7:倒计时
showtime("2022/9/16 20:00");
var timer2 = setInterval(showtime.bind(null, "2022/9/16 20:00"), 1000);
function showtime(num) {
  var nowtime = new Date(), //获取当前时间
    endtime = new Date(num); //定义结束时间
  var totalTime = endtime.getTime() - nowtime.getTime(); //距离结束时间的毫秒数
  if (totalTime < 0) {
    document.querySelector(".h").innerHTML = "00";
    document.querySelector(".m").innerHTML = "00";
    document.querySelector(".s").innerHTML = "00";
    //显示本场结束
    document.querySelector(".new-info").innerHTML = "本场已结束";
    //清空计时器
    clearInterval(timer2);
    return;
  }
  // let day = Math.floor(totalTime / 1000 / 60 / 60 / 24); //计算天数
  let h = Math.floor(totalTime / 1000 / 60 / 60); //计算小时数
  let m = Math.floor((totalTime / 1000 / 60) % 60); //计算分钟数
  let s = Math.floor((totalTime / 1000) % 60); //计算秒数
  h = h > 9 ? h : "0" + h;
  m = m > 9 ? m : "0" + m;
  s = s > 9 ? s : "0" + s;
  document.querySelector(".h").innerHTML = h;
  document.querySelector(".m").innerHTML = m;
  document.querySelector(".s").innerHTML = s;
}

//功能8：吸顶效果
//1. 获取操作的元素 2.滚动事件 -滚动一定高度 顶部导航出现固定不动
// let searchTop=document.querySelector('#search-top');

//功能9：选项卡 tab切换
//1.获取导航区域tab标题  2. 获取选项的内容区域  3. 点击切换 i
let navs = document.querySelectorAll(".nav>li");
let boxs = document.querySelectorAll(".nav-box>div");
/* //点击tab标题
for (let i = 0; i < navs.length; i++) {
  navs[i].onclick = function () {
    //其他移除
    navs.forEach(ele=>{
      ele.className=''
    })
    boxs.forEach(ele=>{
      ele.className=''
    })
    navs[i].className = "active";
    boxs[i].className = "show";
  };
} */

myTab(navs,boxs)
//封装选项卡---- 
function myTab(navs,boxs,){
  navs[0].style.color='red'
  boxs[0].style.display='block'
  for (let i = 0; i < navs.length; i++) {
    navs[i].onclick = function () {
      navs.forEach(ele=>{
        ele.style.color='#666'
      })
      boxs.forEach(ele=>{
        ele.style.display='none'
      })
      //其他移除
      navs[i].style.color='red'
      boxs[i].style.display='block'
    };
  }
}
//频道
let myNav=document.querySelectorAll('.my-nav>li');
let myBox=document.querySelectorAll('.my-box>div');
myTab(myNav,myBox)