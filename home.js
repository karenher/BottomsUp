(function () {
     var personality = "";

//Function Overlay for Modal 
    function overlay() {
        el = document.getElementById("overlay");
        el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
    }

  // -------------------------------------------------------------------------
  // Models
  // -------------------------------------------------------------------------

      var Answers = Backbone.Model.extend({
        defaults: {
            e: 0,
            i: 0,
            n: 0,
            s: 0,
            t: 0,
            f: 0,
            j: 0,
            p: 0
        },

    //Function that goes through question classes to update the model for values for personality trackers
        updateType: function() {
            var that = this;
            $('.EI').each(function() {
                that.set('e', that.get('e') + $('.EI').val()-5);
            });
            $('.IE').each(function() {
                that.set('i', that.get('i') + $('.IE').val()-5);
            });
            $('.NS').each(function() {
                that.set('n', that.get('n') + $('.NS').val()-5);
            });
            $('.SN').each(function() {
                that.set('s', that.get('s') + $('.SN').val()-5);
            });
            $('.TF').each(function() {
                that.set('t', that.get('t') + $('.TF').val()-5);
            });
            $('.FT').each(function() {
                that.set('f', that.get('f') + $('.FT').val()-5);
            });
            $('.JP').each(function() {
                that.set('j', that.get('j') + $('.JP').val()-5);
            });
            $('.PJ').each(function() {
                that.set('p', that.get('p') + $('.PJ').val()-5);
            });
        }
      });

//   // -------------------------------------------------------------------------
//   // Views
//   // -------------------------------------------------------------------------

      var AnswersView = Backbone.View.extend({
        initialize: function () {
            this.$el = $('#overlay');
        },
        render: function() {
            var ctx = $("#myChart").get(0).getContext("2d");
            var data = {
                labels: ["Extroversion", "Introversion", "Intuition", "Sensing", "Thinking", "Feeling", "Juding", "Perceiving"],
                datasets: [
                    {
                        label: "Results DataSet",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: [this.model.get('e'), this.model.get('i'), this.model.get('n'), this.model.get('s'), this.model.get('t'), this.model.get('f'), this.model.get('j'), this.model.get('p')]
                    },
                ]
            };
            var myRadarChart = new Chart(ctx).Radar(data);
            return this;
        }
    });
     
// -------------------------------------------------------------------------
// DOM Ready
// -------------------------------------------------------------------------

$(function () {
     var answers = new Answers();
     var answersView = new AnswersView({model: answers});

     $(".submit").click(function(event){
        event.preventDefault();
        overlay();
        answers.updateType();
        answersView.render();
        //Find the personality type by getting the max for each value
        var ei = Math.max(answers.get("e"), answers.get("i"));
        var ns = Math.max(answers.get("n"), answers.get("s"));
        var tf = Math.max(answers.get("t"), answers.get("f"));
        var jp = Math.max(answers.get("j"), answers.get("p"));
        if (ei === answers.get("e")) personality+="E";
        else personality += "I";
        if (ns === answers.get("n")) personality+="N";
        else personality += "S";
        if (tf === answers.get("t")) personality+="T";
        else personality += "F";
        if (jp === answers.get("j")) personality+="J";
        else personality += "P";
        $('#overlay').append("<p id='title'> Looks like you are a "+personality+" !</p>");

        //Determine whether to update the local Storage for personality types of friends or for yourself
        if (document.getElementById('me').checked) {
            if (window.localStorage.getItem("personalities1") !== null) {
                var addToList = window.localStorage.getItem("personalities1");
                addToList += ","+personality;
                window.localStorage.setItem("personalities1", addToList);
            }
            else {
                window.localStorage.setItem("personalities1", personality);
            }
        }
        else if (document.getElementById('other').checked) {
            if (window.localStorage.getItem("personalities2") !== null) {
                var addToList = window.localStorage.getItem("personalities2");
                addToList += ","+personality;
                window.localStorage.setItem("personalities2", addToList);
            }
            else {
                window.localStorage.setItem("personalities2", personality);
            }
        }
      });
});

}());
