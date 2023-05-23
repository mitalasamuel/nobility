(function($){
    if($(".circle-cursor--outer").length){
        const initCursor = () => {
            const { Back } = window;
            this.outerCursor = document.querySelector(".circle-cursor--outer");
            this.innerCursor = document.querySelector(".circle-cursor--inner");
            this.outerCursorBox = this.outerCursor.getBoundingClientRect();
            this.outerCursorSpeed = 0;
            this.easing = Back.easeOut.config(1.7);
            this.clientX = -100;
            this.clientY = -100;
            this.showCursor = false;

            const unveilCursor = () => {
              TweenMax.set(this.innerCursor, {
                x: this.clientX,
                y: this.clientY
              });
              TweenMax.set(this.outerCursor, {
                x: this.clientX - this.outerCursorBox.width / 2,
                y: this.clientY - this.outerCursorBox.height / 2
              });
              setTimeout(() => {
                this.outerCursorSpeed = 0.2;
              }, 100);
              this.showCursor = true;
            };
            document.addEventListener("mousemove", unveilCursor);

            document.addEventListener("mousemove", e => {
              this.clientX = e.clientX;
              this.clientY = e.clientY;
            });

            const render = () => {
              TweenMax.set(this.innerCursor, {
                x: this.clientX,
                y: this.clientY
              });
              if (!this.isStuck) {
                TweenMax.to(this.outerCursor, this.outerCursorSpeed, {
                  x: this.clientX - this.outerCursorBox.width / 2,
                  y: this.clientY - this.outerCursorBox.height / 2
                });
              }
              if (this.showCursor) {
                document.removeEventListener("mousemove", unveilCursor);
              }
              requestAnimationFrame(render);
            };
            requestAnimationFrame(render);
          };

        initCursor();
    }
    
    if($(".circle-Scroll--outer").length){
        const initScrollCursor = () => {
            const { Back } = window;
            this.outerScrollCursor = document.querySelector(".circle-Scroll--outer");
            this.innerScrollCursor = document.querySelector(".circle-Scroll--inner");
            this.outerScrollCursorBox = this.outerScrollCursor.getBoundingClientRect();
            this.outerScrollCursorSpeed = 0;
            this.easing = Back.easeOut.config(1.7);
            this.clientX = -100;
            this.clientY = -100;
            this.showCursorScroll = false;

            const unveilScrollCursor = () => {
              TweenMax.set(this.innerScrollCursor, {
                x: this.clientX,
                y: this.clientY
              });
              TweenMax.set(this.outerScrollCursor, {
                x: this.clientX - this.outerScrollCursorBox.width / 2,
                y: this.clientY - this.outerScrollCursorBox.height / 2
              });
              setTimeout(() => {
                this.outerScrollCursorSpeed = 0.2;
              }, 100);
              this.showCursorScroll = true;
            };
            document.addEventListener("mousemove", unveilScrollCursor);

            document.addEventListener("mousemove", e => {
              this.clientX = e.clientX;
              this.clientY = e.clientY;
            });

            const renderScroll = () => {
              TweenMax.set(this.innerScrollCursor, {
                x: this.clientX,
                y: this.clientY
              });
              if (!this.isStuck) {
                TweenMax.to(this.outerScrollCursor, this.outerScrollCursorSpeed, {
                  x: this.clientX - this.outerScrollCursorBox.width / 2,
                  y: this.clientY - this.outerScrollCursorBox.height / 2
                });
              }
              if (this.showCursorScroll) {
                document.removeEventListener("mousemove", unveilScrollCursor);
              }
              requestAnimationFrame(renderScroll);
            };
            requestAnimationFrame(renderScroll);
          };

        initScrollCursor();
    }
})(jQuery);