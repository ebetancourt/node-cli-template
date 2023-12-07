export interface StdInStream extends NodeJS.ReadStream {
    fd: 0;
};

export const keyBufferToObject = (keyBuffer: Buffer) => {
    const keyString = keyBuffer.toString();
    return {
        keyStroke: keyString,
        charCode: keyString.charCodeAt(0),
        escChar: keyString.charCodeAt(1),
        ctrlChar: keyString.charCodeAt(2),
    };
};

export const keyPressCharacterMatches = (keyBuffer: Buffer, character: string): boolean => {
    return keyBufferToObject(keyBuffer).keyStroke === character;
};

export const keyCodeMatches = (keyBuffer: Buffer, keyCode: number, strict = true): boolean => {
    const key = keyBufferToObject(keyBuffer);
    // console.log({ key, keyCode });
    return key.charCode === keyCode && (strict ? Number.isNaN(key.escChar) && Number.isNaN(key.ctrlChar) : true);
};

export const isEsc = (keyBuffer: Buffer) => {
    return keyCodeMatches(keyBuffer, 27);
};

export const isArrow = (keyBuffer: Buffer) => {
    if (!isEsc(keyBuffer) && keyCodeMatches(keyBuffer, 27, false)) {
        const key = keyBufferToObject(keyBuffer);
        return [65, 66, 67, 68].includes(key.ctrlChar);
    }
    return false;
};

export const isEnter = (keyBuffer: Buffer) => {
    return keyCodeMatches(keyBuffer, 13);
};

export const getKeyPress = (keyBuffer: Buffer): string => {
    if (isEsc(keyBuffer)) {
        return "esc";
    }
    if (isEnter(keyBuffer)) {
        return "enter";
    }
    if (isArrow(keyBuffer)) {
        const key = keyBufferToObject(keyBuffer);
        switch (key.ctrlChar) {
            case 65:
                return "up";
            case 66:
                return "down";
            case 67:
                return "right";
            case 68:
                return "left";
        }
    }
    return keyBufferToObject(keyBuffer).keyStroke;
};

export const keyboardControl = ({
    handleKey,
    logKeys = false,
}: {
    handleKey: (key: string, stdin: StdInStream) => void,
    logKeys?: boolean,
}) => {
    const stdin = process.stdin;

    // without this, we would only get streams once enter is pressed
    stdin.setRawMode(true);

    // resume stdin in the parent process (node app won't quit all by itself
    // unless an error or process.exit() happens)
    stdin.resume();
    // i don't want binary, do you?
    stdin.setEncoding('utf8');

    // on any data into stdin
    stdin.on('data', function (key) {
        // ctrl-c to exit
        if (key.indexOf('\u0003') == 0) {
            // eslint-disable-next-line no-process-exit
            process.exit();
        }
        if (isEsc(key) || isEnter(key)) {
            // console.log("...continuing");
            stdin.pause();
            stdin.setRawMode(false);
        } else {
            handleKey(getKeyPress(key), stdin);
        }
    });
};
