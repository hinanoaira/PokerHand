const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const numberPower = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
  "A",
];
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
        if (numbers[numberPower[12 - i]] !== 0) {
          if (ans.length + numbers[numberPower[12 - i]] < 5) {
            ans += numberPower[12 - i].repeat(numbers[numberPower[12 - i]]);
          } else {
            ans += numberPower[12 - i].repeat(5 - ans.length);
            break;
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
          ans += numberPower[12 - i].repeat(sameCount);
          numbers[numberPower[12 - i]] -= sameCount;
          break;
        }
      }
      for (let i = 0; i < 13; i++) {
        if (numbers[numberPower[12 - i]] !== 0) {
          if (ans.length + numbers[numberPower[12 - i]] < 5) {
            ans += numberPower[12 - i].repeat(numbers[numberPower[12 - i]]);
          } else {
            ans += numberPower[12 - i].repeat(5 - ans.length);
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
    for (let i = 0; i < 13; i++) {
      if (numbers[numberPower[12 - i]] === 2) {
        ans += numberPower[12 - i].repeat(2);
        numbers[numberPower[12 - i]] -= 2;
      }
      if (ans.length === 4) {
        break;
      }
    }
    for (let i = 0; i < 13; i++) {
      if (numbers[numberPower[12 - i]] !== 0) {
        ans += numberPower[12 - i];
        break;
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
      if (ans.length === 0) {
        if (numbers[numberPower[12 - i]] >= 3) {
          ans += numberPower[12 - i].repeat(3);
          numbers[numberPower[12 - i]] -= 3;
          i = 0;
        }
      } else {
        if (numbers[numberPower[12 - i]] >= 2) {
          ans += numberPower[12 - i].repeat(2);
          break;
        }
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
  if (
    numbers["A"] >= 1 &&
    numbers[2] >= 1 &&
    numbers[3] >= 1 &&
    numbers[4] >= 1 &&
    numbers[5] >= 1
  ) {
    return "5432A";
  }
  return "00000";
}
function IsStraightFlush(targetCards) {
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
        if (numbers[numberPower[12 - i]] !== 0) {
          ans += `${key}${numberPower[12 - i]}`.repeat(
            numbers[numberPower[12 - i]]
          );
        }
      }
      return IsStraight(ans);
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
function Pod(data) {
  const players = data.data;
  const pods = {
    mainPod: { call: 0, pod: 0, joinedPlayer: "" },
    sidePods: [],
  };
  for (let i = 0; i < players.length; i++) {
    const item = players[i];
    if (item.totalbet !== 0) {
      if (item.power === 0) {
        pods.mainPod.pod += item.totalbet;
        continue;
      }
      if (pods.mainPod.call === item.totalbet) {
        pods.mainPod.pod += item.totalbet;
        pods.mainPod.joinedPlayer += i;
        continue;
      }
      if (pods.mainPod.call === 0) {
        pods.mainPod.pod += item.totalbet;
        pods.mainPod.call = item.totalbet;
        pods.mainPod.joinedPlayer += i;
        continue;
      }
      if (pods.mainPod.call > item.totalbet) {
        pods.sidePods.unshift({
          call: pods.mainPod.call - item.totalbet,
          pod:
            (pods.mainPod.call - item.totalbet) *
            pods.mainPod.joinedPlayer.length,
          joinedPlayer: pods.mainPod.joinedPlayer,
        });
        pods.mainPod.call = item.totalbet;
        pods.mainPod.pods -= pods.sidePods[0].pod;
        pods.mainPod.pods += item.totalbet;
        pods.mainPod.joinedPlayer += i;
        continue;
      }
      let bet = item.totalbet;
      pods.mainPod.pod += pods.mainPod.call;
      pods.mainPod.joinedPlayer += i;
      bet -= pods.mainPod.call;
      for (const [index, sidePod] of Object.entries(pods.sidePods)) {
        if (sidePod.call <= bet) {
          sidePod.pod += sidePod.call;
          sidePod.joinedPlayer += i;
          bet -= sidePod.call;
          if (bet === 0) {
            break;
          }
        } else {
          pods.sidePods.splice(parseInt(index) + 1, 0, {
            call: sidePod.call - bet,
            pod: sidePod.call - bet * sidePod.joinedPlayer.length,
            joinedPlayer: sidePod.joinedPlayer,
          });
          sidePod.call = bet;
          sidePod.pod -= pods.sidePods[parseInt(index) + 1].pod;
          sidePod.pod += bet;
          sidePod.joinedPlayer = sidePod.joinedPlayer + i;
          bet = 0;
          break;
        }
      }
      if (bet !== 0) {
        pods.sidePods.push({
          call: bet,
          pod: bet,
          joinedPlayer: `${i}`,
        });
      }
    }
  }
  return pods;
}
function Fight(data, prizeonly) {
  const players = data.data;
  const dealer = data.dealer;
  const pods = Pod(data);
  const result = JSON.parse(
    `[${'{"prize":0,"text":""},'.repeat(players.length).slice(0, -1)}]`
  );
  const mainPod = JSON.parse(JSON.stringify(pods.mainPod));
  const sidePods = JSON.parse(JSON.stringify(pods.sidePods));
  let sidePodOffset = 0;
  while (mainPod.pod !== 0 || sidePods.length !== 0) {
    let topPower = 0;
    let topPlayers = "";
    for (let i = 0; i < players.length; i++) {
      const item = players[i];
      if (item.power > topPower) {
        topPower = item.power;
        topPlayers = `${i}`;
      } else if (item.power === topPower) {
        topPlayers += i;
      }
    }
    for (
      let i = dealer;
      topPlayers.length !== 0;
      i = (i + 1) % players.length
    ) {
      if (players[i].power === topPower) {
        if (mainPod.pod !== 0) {
          const prize = Math.ceil(mainPod.pod / topPlayers.length);
          result[i].prize += prize;
          result[i].text += `\nMainPod ${pods.mainPod.pod} > ${prize}`;
          mainPod.pod -= prize;
        }
        for (const [index, sidePod] of Object.entries(sidePods)) {
          if (sidePod.joinedPlayer.includes(i)) {
            let count = 0;
            for (const player of topPlayers) {
              if (sidePod.joinedPlayer.includes(player)) {
                count++;
              }
            }
            const prize = Math.ceil(sidePod.pod / count);
            result[i].prize += prize;
            result[i].text += `\nSidePod${
              parseInt(index) + sidePodOffset + 1
            } ${pods.sidePods[index].pod} > ${prize}`;
            sidePod.pod -= prize;
          }
        }
        players[i].power = 0;
        topPlayers = topPlayers.replace(i, "");
      }
      for (let j = sidePods.length - 1; j >= 0; j--) {
        if (sidePods[j].pod === 0) {
          sidePods.splice(j, 1);
          pods.sidePods.splice(j, 1);
          sidePodOffset++;
        }
      }
    }
  }
  let ans = "";
  for (let i = 0; i < players.length; i++) {
    if (prizeonly) {
      ans += `${result[i].prize},`;
    } else {
      ans += `${result[i].prize} WIN!${result[i].text},`;
    }
  }
  return ans.slice(0, -1);
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
  const prizeonly = req.query.prizeonly === "true";
  const ans = Fight(req.body, prizeonly);
  res.send(ans);
});
app.post("/pod", (req, res) => {
  const pods = Pod(req.body);
  let ans = `MainPod ${pods.mainPod.pod}`;
  for (const [index, sidePod] of Object.entries(pods.sidePods)) {
    ans += `\nSidePod${parseInt(index) + 1} ${sidePod.pod}`;
  }
  res.send(ans);
});

const port = process.env.PORT || 3000;
const server = app.listen(port, function () {
  console.log(`Node.js is listening to PORT:${server.address().port}`);
});
