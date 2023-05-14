import React from "react";
import styled from "styled-components";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const text = `
[Verse]
                C
Pack yourself a toothbrush dear
                F         C
Pack yourself a favorite blouse
           C
Take a withdrawlslip
                 F       C
Take all of your savings out
                   Am         G
'Cause if we don't leave this town
               F       C
We might never make it out
              Am      G
And I was not born to drown
        C        F C
Baby c'mon
 
[Verse]
                   C
Forget what father Brennan said
            F       C
We were not born in sin
             C
Leave a note on your bed
                F           C
Let your mother know you're safe
           Am       G
And by the time she wakes
                 F           C
We'll 've driven through the state
                 Am          G
We'll 've driven through the night
        C
Baby c'mon
 
[Chorus]
C*
If the sun don't shine on me today
           F       Am        G       C
And if the subways flood and bridges break
C*
Will you lay yourself down and dig your grave
            F    Am           G     C
Or will you rail against your dying day
 
[Verse]
C                                         F       C
And when we looked outside, couldn't even see the sky
                                    F   C
How do you pay the rent, is it your parents
      Am        G     F           C
Or is hard work dear, holding the atmosphere
              Am        G
I don't wanna live like that
 
[Chorus II]
       C                  F
If the sun don't shine on me today
           Am                G
And if the subways flood and bridges break
 
[Bridge]
Am G    C       F     Am   G  C
Jesus   Christ, can't save me tonight
    Am G    C      F   Am   G         C
Put on your dress, yes wear something nice
Am     G    C   F   Am     G  C
Decide on   me, yea decide on us
Am  G   C   F     Am  G     C
Oh, oh, oh, Illinois, Illinois
 
F C
 
[End-verse]
                C
Pack yourself a toothbrush dear
                F         C
Pack yourself a favorite blouse
           C
Take a withdrawlslip
                 F       C
Take all of your savings out
                   Am         G
'Cause if we don't leave this town
               F       C
We might never make it out
 
`;

const text2 = `

Ami   Emi  F            C
R: Sáro, Sáro, v noci se mi zdálo,
      F          C          F         G
   že tři andělé Boží k nám přišli na oběd.
   Ami   Emi   F              C
   Sáro, Sáro, jak moc a nebo málo
      F           C          F    G
   mi chybí abych tvojí duši mohl rozumět.

   Ami            Emi    F            C
1. Sbor kajícných mnichů jde krajinou v tichu
      F          C                    F         G
   a pro všechnu lidskou pýchu má jen přezíravý smích
   Ami          Emi       F          C
   Z prohraných válek se vojska domů vrací
      F            C        F            G
   ač zbraně stále burácí a bitva zuří v nich.
   
R: Sáro, Sáro...

2. Vévoda v zámku čeká na balkóně
   až přivedou mu koně, pak mává na pozdrav
   Srdcová dáma má v každé ruce růže,
   tak snadno pohřbít může sto urozených hlav.
   
R: Sáro, Sáro...

3. Královnin šašek s pusou od povidel
   sbírá zbytky jídel a myslí na útěk
   A v podzemí skrytí slepí alchymisté
   už objevili jistě proti povinnosti lék

R: Sáro, Sáro, v noci se mi zdálo
   že tři andělé Boží k nám přišli na oběd
   Sáro, Sáro, jak moc a nebo málo
   ti chybí abys mojí duši mohla rozumět

4. Páv pod tvým oknem zpívá sotva procit
   o tajemstvích noci ve tvých zahradách
   A já, potulný kejklíř, co svázali mu ruce,
   teď hraju o tvé srdce a chci mít tě nadosah!
 
   Ami   Emi   F        C
R: Sáro, Sáro, pomalu a líně
   F                C     F             G
   s hlavou na tvém klíně chci se probouzet
   F           C     F         C
   Sáro, Sáro, Sáro, rosa padá ráno
     F            C     F         G
   a v poledne už možná bude jiný svět
   F     C     F             C
   Sáro, Sáro, vstávej, milá Sáro!
   F            Dmi        Cmaj7
   Andělé k nám přišli na oběd`;

const Container = styled.div`
  font-family: "Courier New", Courier, monospace;
  columns: 400px;
  height: 100vh;
  column-fill: auto;
`;
const ChordLine = styled.div`
  color: red;
  font-weight: 900;
  margin: 5px 0px 0 0;
  font-size: 15px;
`;
const TextLine = styled.div`
  margin: 0px 0 5px 0;
  font-size: 15px;
`;
const Heading = styled.div`
  font-size: 17px;
  font-weight: 900;
  margin: 10px 0px 0 0;
`;

const processText = (text: string) => {
  const lines = text.split("\n");
  const processedLines = lines.map((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith("[") && trimmedLine.endsWith("]")) {
      return <Heading>{trimmedLine}</Heading>;
    }
    if ((trimmedLine.match(/  /g) || []).length > 3) {
      return <ChordLine>{trimmedLine.replaceAll(" ", "\u00A0")}</ChordLine>;
    } else return <TextLine>{trimmedLine}</TextLine>;
  });
  return processedLines;
};

function App() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  return (
    <>
      <Container>{processText(text)}</Container>

      <div>
        <p>Microphone: {listening ? "on" : "off"}</p>
        <button
          onClick={() => {
            SpeechRecognition.startListening();
          }}
        >
          Start
        </button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p>{transcript}</p>
      </div>
    </>
  );
}

export default App;
