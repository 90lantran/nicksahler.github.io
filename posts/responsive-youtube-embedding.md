Something I forgot to mention when I published my last post is that I, at the same time, whipped together a neat little responsive youtube frame. While I'm not new to web dev, I am new to having a blog that I actively keep pretty (weird, right?); so I'm kinda proud of it because of how nice it looks. It's also super simple and easy, and I like simple.

Here's the source code and some examples for those of you interested:

```
article .youtube {
  position: relative;
  /* (9 / 16 * 100) */
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  margin-bottom: 10px;
}

article .youtube iframe,
article .youtube object,
article .youtube embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

and I just wrap the video's embed in a div, which is basically like escaping a section of markdown. Here are some examples, and my favourite videos on the internet; try resizing the window!

<div class="youtube"><iframe src="//www.youtube.com/embed/ceJ_DeT-c3M?rel=0&amp;vq=hd1080" frameborder="0" allowfullscreen></iframe></div>
<div class="youtube"><iframe src="//www.youtube.com/embed/5uCdq5BpES4?rel=0&amp;vq=hd1080" frameborder="0" allowfullscreen></iframe></div>
<div class="youtube"><iframe src="//www.youtube.com/embed/lFBZBAbbKt8?rel=0&amp;vq=hd1080" frameborder="0" allowfullscreen></iframe></div>
<div class="youtube"><iframe src="//www.youtube.com/embed/8vtMJpadg-E?start=395&rel=0&amp;vq=hd1080" frameborder="0" allowfullscreen></iframe></div>