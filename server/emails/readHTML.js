import  fs  from "fs";
import ejs from "ejs";

const readHTML = async (path, options) => {
    try {
        const str = await ejs.renderFile(path, options);
        return str;
    } catch (err) {
        // console.error(`Error: ${err}`);
        console.error(err);
        return;
    }
};

export default readHTML;
