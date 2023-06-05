import { findAll } from "../utils/stringUtils";

const ChatImage = ({ style, alt, ...props }) => (
    <img
        {...props}
        style={{ width: "100%", ...props }}
        alt={alt || "fractalclock.com"}
    />
);

const SPECIALS = {
    ":coffee:": (
        <ChatImage
            src="https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG"
            alt="Coffee"
        />
    ),
    ":love:": (
        <ChatImage
            src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-1660669048.jpg?crop=1.00xw:0.752xh;0,0&resize=1200:*"
            alt="Love"
        />
    ),
    ":dylan:": (
        <ChatImage
            src="https://resizing.flixster.com/Gc8BERNydw7dUYBPSG0-BFNk5SA=/506x652/v2/https://flxt.tmsimg.com/v9/AllPhotos/166890/166890_v9_bb.jpg"
            alt="Dylan"
        />
    ),
    crowdventure: <a href="https://crowdventure.me/">crowdventure</a>,
    josh: <span style={{ color: "red" }}>chad</span>,
    ben: <span style={{ color: "red" }}>chad</span>,
    dom: <span style={{ color: "red" }}>chad</span>,
    evan: <span style={{ color: "red" }}>chad</span>,
    soph: <span style={{ color: "red" }}>chad</span>,
    diego: <span style={{ color: "red" }}>chad</span>,
    marissa: <span style={{ color: "red" }}>chad</span>,
    herb: <span style={{ color: "red" }}>chad</span>,
    andrew: <span style={{ color: "red" }}>chad</span>,
    wally: (
        <span style={{ color: "blue", textShadow: "5px 5px white" }}>thad</span>
    ),
    nigger: "******",
    faggot: "******",
};
export const replaceSpecials = (message) => {
    const replaceSet = {};
    for (let string of Object.keys(SPECIALS)) {
        for (let index of findAll(message, string)) {
            replaceSet[index] = [index, string.length, SPECIALS[string]];
        }
    }
    const returnMessage = [];
    let keyIndex = 0;
    let remainingMessage = message;
    for (let replacement of Object.keys(replaceSet)
        .map((index) => replaceSet[index])
        .sort((a, b) => b[0] - a[0])) {
        returnMessage.push(
            <span key={keyIndex}>
                {remainingMessage.slice(0, replacement[0])}
            </span>,
            <span key={keyIndex + 1}>{replacement[2]}</span>
        );
        remainingMessage = remainingMessage.slice(
            replacement[0] + replacement[1]
        );
        keyIndex += 2;
    }
    returnMessage.push(<span key={keyIndex}>{remainingMessage}</span>);
    return returnMessage;
};
