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
    crowdventure: <a href="https://crowdventure.me/">crowdventure</a>,
    nigger: "******",
    faggot: "******",
    fag: "***",
    cunt: "****",
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
