/**
 * @auther DangChengcheng 璇蜂繚鐣欎綔鑰�
 * @mailTo dc2002007@163.com
 */

var Step_Tool_dc =function(ClassName,callFun){
    this.ClassName=ClassName,
    this.callFun=callFun,
    this.Steps = new Array(),
    this.stepAllHtml="";

}
Step_Tool_dc.prototype={
    /**
     * 缁樺埗鍒扮洰鏍囦綅缃�
     */
     createStepArray:function(currStep,stepListJson){
        this.currStep=currStep;

            for (var i=0; i<stepListJson.length;i++){
            var  Step_Obj =new Step( this.currStep,stepListJson[i].StepNum,stepListJson[i].StepText,stepListJson.length);

                Step_Obj.createStepHtml();
                this.Steps.push(Step_Obj);
            }

        },
    drawStep:function(currStep,stepListJson){
        this.clear();
        this.createStepArray(currStep,stepListJson);
        if(this.Steps.length>0){
        this.stepAllHtml+="<ul>";
        for (var i=0; i<this.Steps.length;i++){
            this.stepAllHtml+=this.Steps[i].htmlCode;
        }
        this.stepAllHtml+="</ul>";
        jQuery("."+this.ClassName).html(this.stepAllHtml);
            this.createEvent();
         } else{
            jQuery("."+this.ClassName).html("娌℃湁浠讳綍姝ラ");
        }
    },createEvent:function(){
        var self=this;
        jQuery("."+this.ClassName+" ul li a").click(function(){
            var num=jQuery(this).attr("data-value");
            var text=jQuery(this).attr("data-text");
            result={value:num,text:text} ;
            eval(self.callFun+"(result)");
        });
    }
    ,clear:function(){
        this.Steps=new Array();
        jQuery("."+this.ClassName).html("");
        this.stepAllHtml="";
    }
}
var Step=function(currStep,StepNum,StepText,totalCount){
        this.currStep=currStep,
        this.StepNum=StepNum ,
        this.StepText=StepText,
        this.totalCount=totalCount,
        this.htmlCode="";
}
Step.prototype={
    createStepHtml:function(){
         var stepHtml="\<span\>"+this.StepNum+"\</span\>";
        stepHtml=stepHtml+"\<a href=\"#\"    data-value=\""+this.StepNum+"\" data-text=\""+this.StepText+"\" \>"+this.StepText+"\</a\>";
        if(this.currStep>this.totalCount){
            this.currStep=this.totalCount;
        }else if(this.currStep<=0){this.currStep=1;}

        if(this.currStep>this.StepNum&&this.StepNum==1){
            classSype="firstFinshStep";
        } else if(this.currStep==this.StepNum&&this.StepNum==1){
            classSype="firstFinshStep_curr1";
        }
       else if(this.currStep==this.StepNum&&this.currStep!=this.totalCount){//褰撳墠姝ラ,涓嬩竴涓湭杩涜,骞朵笖涓嶆槸鏈€鍚庝竴涓�
            classSype="coressStep";
        }else  if(this.currStep==this.StepNum&&this.StepNum==this.totalCount){//褰撳墠姝ラ 骞朵笖鏄渶鍚庝竴姝�
            classSype="finshlast";
        }else if(this.currStep<this.StepNum&&this.StepNum==this.totalCount){//鏈繘琛屾楠�,骞朵笖鏄渶鍚庝竴涓�
            classSype="last";
        } else if(this.currStep<this.StepNum){//鏈繘琛岀殑姝ラ
            classSype="loadStep";
        } else if(this.currStep>this.StepNum){//宸茶繘琛岀殑姝ラ
            classSype="finshStep";
        }
        stepHtml="\<li class=\""+classSype+"\"\>"+stepHtml+"\</a\>";
        this.htmlCode=stepHtml;
    }

}

