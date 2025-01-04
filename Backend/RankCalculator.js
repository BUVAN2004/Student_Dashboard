const mongoose = require("mongoose");
const studentModel = require("./Models/Student.model");

async function skillScore() {
  console.log("skillScore");
  const data = await studentModel.find();
  const datalength = data.length;
  const totallevels = 10;
  for (let i = 0; i < datalength; i++) {
    psScore(data[i]);
    data[i].score = ((data[i].cummulativeFa + data[i].placementAttendance + data[i].attendance + data[i].psScore)/4);
    // await data[i].save();
  }
  async function psScore(student) {
    let levelClearedCount = 0,
      languagelength = student.psSkill.length;
    for (let i = 0; i < languagelength; i++) {
      levelClearedCount += student.psSkill[i].completedStatus.length;
    }
    student.psScore = (levelClearedCount * 100) / totallevels;
    return;
  }
  data.sort((a , b) => {
    if(a.score < b.score){
      return 1;
    }else if(a.score == b.score){
      return 0; 
    }
    return -1;
  })
  let rank = 1;
  for(let i=0; i<datalength-1; i++){
    data[i].placementRank = rank;
    if(data[i].score != data[i+1].score) rank++;
    await data[i].save();
  }
  // console.log(data.map((student)=>({Name : student.Name, Score : student.score, Rank : student.placementRank})));
  
}



module.exports = skillScore;
