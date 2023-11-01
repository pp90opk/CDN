"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fs = __importStar(require("fs"));
const yaml = __importStar(require("yaml"));
async function otherrule() {
    const getData = async (rulename, rule) => {
        const response = await (0, axios_1.default)(`https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/${rulename}/${rulename}.yaml`);
        return (yaml.parse(response.data))['payload'].map(pp => `${pp},${rule}`);
    };
    const [Cloudflare, Spotify, Binance] = await Promise.all([
        getData("Cloudflare", "US"),
        getData("Spotify", "US"),
        getData("Binance", "UK")
    ]);
    const US = Cloudflare.concat(Spotify);
    const UK = Binance;
    console.log({ UK, US });
    fs.writeFileSync('UK.yaml', yaml.stringify({ payload: UK }), 'utf8');
    fs.writeFileSync('US.yaml', yaml.stringify({ payload: US }), 'utf8');
    return { UK, US };
}
otherrule();
