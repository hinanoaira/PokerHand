const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const numberPower = [2, 3, 4, 5, 6, 7, 8, 9, "T", "J", "Q", "K", "A"];
const numbersTemplate = {
  A: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
  T: 0,
  J: 0,
  Q: 0,
  K: 0,
};

function IsFlush(targetCards) {
  const suits = { S: 0, H: 0, D: 0, C: 0 };
  for (let i = 0; i < targetCards.length / 2; i++) {
    suits[targetCards[i * 2]]++;
  }
  for (const key in suits) {
    if (suits[key] >= 5) {
      let ans = "";
      const numbers = Object.assign({}, numbersTemplate);
      for (let i = 0; i < targetCards.length / 2; i++) {
        if (targetCards[i * 2] === key) {
          numbers[targetCards[1 + i * 2]]++;
        }
      }
      for (let i = 0; i < 13; i++) {
        if (numbers[numberPower[12 - i]] > 0) {
          for (let j = 0; j < numbers[numberPower[12 - i]]; j++) {
            ans += numberPower[12 - i];
            if (ans.length === 5) {
              break;
            }
          }
        }
      }
      return ans;
    }
  }
  return "00000";
}
function IsSameNumber(targetCards, sameCount) {
  const numbers = Object.assign({}, numbersTemplate);
  for (let i = 0; i < targetCards.length / 2; i++) {
    numbers[targetCards[1 + i * 2]]++;
  }
  for (const key in numbers) {
    if (numbers[key] === sameCount) {
      let ans = "";
      for (let i = 0; i < 13; i++) {
        if (numbers[numberPower[12 - i]] === sameCount) {
          for (let j = 0; j < sameCount; j++) {
            ans += numberPower[12 - i];
          }
          break;
        }
      }
      for (let i = 0; i < 13; i++) {
        if (numbers[numberPower[12 - i]] === 1) {
          ans += numberPower[12 - i];
          if (ans.length === 5) {
            break;
          }
        }
      }
      return ans;
    }
  }
  return "00000";
}
function IsTwoPairs(targetCards) {
  const numbers = Object.assign({}, numbersTemplate);
  for (let i = 0; i < targetCards.length / 2; i++) {
    numbers[targetCards[1 + i * 2]]++;
  }
  const sameCount = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
  for (const key in numbers) {
    sameCount[numbers[key]]++;
  }
  if (sameCount[2] >= 2) {
    let ans = "";
    let count = 0;
    for (let i = 0; i < 13; i++) {
      if (numbers[numberPower[12 - i]] === 2) {
        for (let j = 0; j < 2; j++) {
          ans += numberPower[12 - i];
        }
        count++;
        if (count === 2) {
          break;
        }
      }
    }
    for (let i = 0; i < 13; i++) {
      if (numbers[numberPower[12 - i]] === 1) {
        ans += numberPower[12 - i];
        if (ans.length === 5) {
          break;
        }
      }
    }
    return ans;
  }
  return "00000";
}
function IsFullHouse(targetCards) {
  const numbers = Object.assign({}, numbersTemplate);
  for (let i = 0; i < targetCards.length / 2; i++) {
    numbers[targetCards[1 + i * 2]]++;
  }
  const sameCount = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
  for (const key in numbers) {
    sameCount[numbers[key]]++;
  }
  if ((sameCount[3] >= 1 && sameCount[2] >= 1) || sameCount[3] >= 2) {
    let ans = "";
    for (let i = 0; i < 13; i++) {
      if (numbers[numberPower[12 - i]] >= 2) {
        for (let j = 0; j < (numbers[numberPower[12 - i]] === 2 ? 2 : 3); j++) {
          ans += numberPower[12 - i];
        }
        for (let j = i + 1; j < 13; j++) {
          if (numbers[numberPower[12 - j]] >= 5 - ans.length) {
            for (let k = 0; k <= 5 - ans.length; k++) {
              ans += numberPower[12 - j];
            }
            break;
          }
        }
        break;
      }
    }
    return ans;
  }
  return "00000";
}
function IsStraight(targetCards) {
  const numbers = Object.assign({}, numbersTemplate);
  for (let i = 0; i < targetCards.length / 2; i++) {
    numbers[targetCards[1 + i * 2]]++;
  }
  for (let i = 8; i >= 0; i--) {
    if (
      numbers[numberPower[i]] >= 1 &&
      numbers[numberPower[i + 1]] >= 1 &&
      numbers[numberPower[i + 2]] >= 1 &&
      numbers[numberPower[i + 3]] >= 1 &&
      numbers[numberPower[i + 4]] >= 1
    ) {
      let ans = "";
      ans += numberPower[i + 4];
      ans += numberPower[i + 3];
      ans += numberPower[i + 2];
      ans += numberPower[i + 1];
      ans += numberPower[i];
      return ans;
    }
  }
  return "00000";
}
function IsStraightFlush(targetCards) {
  if (IsStraight(targetCards) !== "00000" && IsFlush(targetCards) !== "00000") {
    const suits = { S: 0, H: 0, D: 0, C: 0 };
    for (let i = 0; i < targetCards.length / 2; i++) {
      suits[targetCards[i * 2]]++;
    }
    for (const key in suits) {
      if (suits[key] >= 5) {
        let tmp = "";
        const numbers = Object.assign({}, numbersTemplate);
        for (let i = 0; i < targetCards.length / 2; i++) {
          if (targetCards[i * 2] === key) {
            numbers[targetCards[1 + i * 2]]++;
          }
        }
        for (let i = 0; i < 13; i++) {
          if (numbers[numberPower[12 - i]] > 0) {
            for (let j = 0; j < numbers[numberPower[12 - i]]; j++) {
              tmp += key;
              tmp += numberPower[12 - i];
            }
          }
        }
        return IsStraight(tmp);
      }
    }
  }
  return "00000";
}
function IsRoyalStraight(targetCards) {
  const Straight = IsStraight(targetCards);
  if (Straight === "AKQJT") {
    return "AKQJT";
  }
  return "00000";
}
function IsRoyalStraightFlash(targetCards) {
  const StraightFlash = IsStraightFlush(targetCards);
  if (StraightFlash === "AKQJT") {
    return "AKQJT";
  }
  return "00000";
}
function SearchHighCard(targetCards) {
  const numbers = Object.assign({}, numbersTemplate);
  for (let i = 0; i < targetCards.length / 2; i++) {
    numbers[targetCards[1 + i * 2]]++;
  }
  let ans = "";
  for (let i = 0; i < 13; i++) {
    if (numbers[numberPower[12 - i]] === 1) {
      ans += numberPower[12 - i];
      if (ans.length === 5) {
        break;
      }
    }
  }
  return ans;
}
function Analyze(targetCards) {
  const RoyalStraightFlash = IsRoyalStraightFlash(targetCards);
  const StraightFlash = IsStraightFlush(targetCards);
  const FourCard = IsSameNumber(targetCards, 4);
  const FullHouse = IsFullHouse(targetCards);
  const Flash = IsFlush(targetCards);
  const RoyalStraight = IsRoyalStraight(targetCards);
  const Straight = IsStraight(targetCards);
  const ThreeCard = IsSameNumber(targetCards, 3);
  const TwoPairs = IsTwoPairs(targetCards);
  const OnePair = IsSameNumber(targetCards, 2);
  const HighCard = SearchHighCard(targetCards);
  if (RoyalStraightFlash !== "00000") {
    return `RoyalStraightFlash,A${RoyalStraightFlash}`;
  }
  if (StraightFlash !== "00000") {
    return `StraightFlash,9${StraightFlash}`;
  }
  if (FourCard !== "00000") {
    return `FourCard,8${FourCard}`;
  }
  if (FullHouse !== "00000") {
    return `FullHouse,7${FullHouse}`;
  }
  if (Flash !== "00000") {
    return `Flash,6${Flash}`;
  }
  if (RoyalStraight !== "00000") {
    return `RoyalStraight,5${RoyalStraight}`;
  }
  if (Straight !== "00000") {
    return `Straight,4${Straight}`;
  }
  if (ThreeCard !== "00000") {
    return `ThreeCard,3${ThreeCard}`;
  }
  if (TwoPairs !== "00000") {
    return `TwoPairs,2${TwoPairs}`;
  }
  if (OnePair !== "00000") {
    return `OnePair,1${OnePair}`;
  } else {
    return `HighCard,0${HighCard}`;
  }
}
function Fight(data) {
  const dealer = data.dealer;
  const pods = {
    mainPod: { call: 0, pod: 0, joinedPlayer: "" },
    sidePods: [],
  };
  for (let i = 0; i < 8; i++) {
    const item = data.data[i];
    if (item.power !== 0 && item.totalbet !== 0) {
      if (pods.mainPod.call !== item.totalbet) {
        if (pods.mainPod.call === 0) {
          pods.mainPod.pod = item.totalbet;
          pods.mainPod.call = item.totalbet;
          pods.mainPod.joinedPlayer += i;
        } else {
          if (item.totalbet < pods.mainPod.call) {
            const newSidePod = {
              call: pods.mainPod.call - item.totalbet,
              pod:
                (pods.mainPod.call - item.totalbet) *
                pods.mainPod.joinedPlayer.length,
              joinedPlayer: pods.mainPod.joinedPlayer,
            };
            const newMainPod = {
              call: item.totalbet,
              pod: pods.mainPod.pod - newSidePod.pod + item.totalbet,
              joinedPlayer: pods.mainPod.joinedPlayer + i,
            };
            pods.mainPod = newMainPod;
            pods.sidePods.unshift(newSidePod);
          } else {
            let bet = item.totalbet;
            pods.mainPod.pod += pods.mainPod.call;
            pods.mainPod.joinedPlayer += i;
            bet -= pods.mainPod.call;
            for (let j = 0; j < pods.sidePods.length; j++) {
              const sidePod = pods.sidePods[j];
              if (sidePod.call <= bet) {
                sidePod.pod += sidePod.call;
                sidePod.joinedPlayer += i;
                bet -= sidePod.call;
                if (bet === 0) {
                  break;
                }
              } else {
                const newSidePod = {
                  call: sidePod.call - bet,
                  pod: (sidePod.call - bet) * sidePod.joinedPlayer.length,
                  joinedPlayer: sidePod.joinedPlayer,
                };
                sidePod.call = bet;
                sidePod.pod = sidePod.pod - newSidePod.pod + bet;
                sidePod, (joinedPlayer = sidePod.joinedPlayer + i);
                bet = 0;
                pods.sidePods.splice(j + 1, 0, newSidePod);
                break;
              }
            }
            if (bet !== 0) {
              const newSidePod = {
                call: bet,
                pod: bet,
                joinedPlayer: `${i}`,
              };
              pods.sidePods.push(newSidePod);
            }
          }
        }
      } else {
        pods.mainPod.pod += item.totalbet;
        pods.mainPod.joinedPlayer += i;
      }
    } else if (item.totalbet !== 0) {
      pods.mainPod.pod += item.totalbet;
    }
  }
  const players = data.data;
  const result = [0, 0, 0, 0, 0, 0, 0, 0];
  const resultSidePod = ["", "", "", "", "", "", "", ""];
  let sidePodLevel = 1;
  while (pods.mainPod.pod !== 0 || pods.sidePods.length !== 0) {
    let topPower = 0;
    let topPlayers = "";
    for (let i = 0; i < 8; i++) {
      const item = players[i];
      if (item.power > topPower) {
        topPower = item.power;
        topPlayers = `${i}`;
      } else if (item.power === topPower) {
        topPlayers += i;
      }
    }
    for (let i = 0; i < topPlayers.length; i++) {
      players[topPlayers[i]].power = 0;
    }
    if (topPlayers.length === 1) {
      if (pods.mainPod.pod !== 0) {
        result[topPlayers] += pods.mainPod.pod;
        resultSidePod[
          topPlayers
        ] = `MainPod:${pods.mainPod.pod} > ${pods.mainPod.pod}`;
        pods.mainPod.pod = 0;
      }
      while (pods.sidePods.length !== 0) {
        if (pods.sidePods[0].joinedPlayer.includes(topPlayers)) {
          result[topPlayers] += pods.sidePods[0].pod;
          if (resultSidePod[topPlayers] !== "") {
            resultSidePod[topPlayers] += "\n";
          }
          resultSidePod[
            topPlayers
          ] += `SidePod${sidePodLevel}:${pods.sidePods[0].pod} > ${pods.sidePods[0].pod}`;
          sidePodLevel++;
          pods.sidePods.shift();
        } else {
          break;
        }
      }
    } else {
      let tmp = topPlayers;
      let tmpPod = pods.mainPod.pod;
      while (pods.mainPod.pod !== 0) {
        for (let i = 0; i < tmp.length; i++) {
          result[tmp[i]] += Math.floor(pods.mainPod.pod / tmp.length);
        }
        pods.mainPod.pod -=
          Math.floor(pods.mainPod.pod / tmp.length) * tmp.length;
        for (let i = dealer; true; i--) {
          if (i === -1) {
            i = 7;
          }
          if (tmp.includes(i)) {
            tmp = tmp.replace(`${i}`, "");
            break;
          }
        }
      }
      if (tmpPod !== 0) {
        for (let i = 0; i < topPlayers.length; i++) {
          resultSidePod[topPlayers[i]] = `MainPod:${tmpPod} > ${
            result[topPlayers[i]]
          }`;
        }
      }
      tmp = topPlayers;
      while (pods.sidePods.length !== 0) {
        tmpPod = pods.sidePods[0].pod;
        const tmpResult = Object.assign({}, result);
        while (pods.sidePods[0].pod !== 0) {
          const tmp2 = tmp;
          for (let i = 0; i < tmp2.length; i++) {
            if (!pods.sidePods[0].joinedPlayer.includes(tmp2[i])) {
              tmp = tmp.replace(tmp2[i], "");
            }
          }
          for (let i = 0; i < tmp.length; i++) {
            result[tmp[i]] += Math.floor(pods.sidePods[0].pod / tmp.length);
          }
          pods.sidePods[0].pod -=
            Math.floor(pods.sidePods[0].pod / tmp.length) * tmp.length;
          for (let i = dealer; true; i--) {
            if (i === -1) {
              i = 7;
            }
            if (tmp.includes(i)) {
              tmp = tmp.replace(i, "");
              break;
            }
          }
        }
        for (let i = 0; i < 8; i++) {
          if (result[i] !== tmpResult[i]) {
            if (resultSidePod[i] !== "") {
              resultSidePod[i] += "\n";
            }
            resultSidePod[i] += `SidePod${sidePodLevel}:${tmpPod} > ${
              result[i] - tmpResult[i]
            }`;
          }
        }
        sidePodLevel++;
        pods.sidePods.shift();
        if (tmp === "") {
          break;
        }
      }
    }
  }
  return `${result[0]} WIN!\n${resultSidePod[0]},${result[1]} WIN!\n${resultSidePod[1]},${result[2]} WIN!\n${resultSidePod[2]},${result[3]} WIN!\n${resultSidePod[3]},${result[4]} WIN!\n${resultSidePod[4]},${result[5]} WIN!\n${resultSidePod[5]},${result[6]} WIN!\n${resultSidePod[6]},${result[7]} WIN!\n${resultSidePod[7]},`;
}

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello world");
});
app.get("/analyze", (req, res) => {
  if (req.query.data === undefined || req.query.data === "") {
    res.send("000000");
    return;
  }
  const ans = Analyze(req.query.data);
  res.send(ans);
});
app.post("/fight", (req, res) => {
  const ans = Fight(req.body);
  res.send(ans);
});

const port = process.env.PORT || 3000;
const server = app.listen(port, function () {
  console.log(`Node.js is listening to PORT:${server.address().port}`);
});
