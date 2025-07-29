const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

const USER_ID = "john_doe_17091999";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

const isNumber = (str) => /^\d+$/.test(str);
const isAlpha = (str) => /^[a-zA-Z]+$/.test(str);
const formatConcatString = (s) => {
    return s
        .split("")
        .reverse()
        .map((char, i) => (i % 2 === 0 ? char.toUpperCase() : char.toLowerCase()))
        .join("");
};

app.post("/bfhl", (req, res) => {
    const input = req.body.data || [];

    const even = [];
    const odd = [];
    const alpha = [];
    const special = [];
    let sum = 0;
    let allAlpha = "";

    input.forEach((item) => {
        const str = String(item);

        if (isNumber(str)) {
            const num = parseInt(str);
            sum += num;
            (num % 2 === 0 ? even : odd).push(str);
        } else if (isAlpha(str)) {
            alpha.push(str.toUpperCase());
            allAlpha += str;
        } else {
            special.push(str);
        }
    });

    const response = {
        is_success: true,
        user_id: USER_ID,
        email: EMAIL,
        roll_number: ROLL_NUMBER,
        odd_numbers: odd,
        even_numbers: even,
        alphabets: alpha,
        special_characters: special,
        sum: String(sum),
        concat_string: formatConcatString(allAlpha),
    };

    res.status(200).json(response);
});

app.listen(PORT, () => {
    console.log(`Server live at http://localhost:${PORT}`);
});
