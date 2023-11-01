import axios from "axios";
import * as fs from 'fs';
import * as yaml from 'yaml';
async function otherrule() {
    const getData = async (rulename, rule) => {
        const response = await axios(`https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/${rulename}/${rulename}.yaml`);
        return (yaml.parse(response.data))['payload'].map(pp => `${pp},${rule}`);
    };
    const [Cloudflare, Spotify, Binance] = await Promise.all([
        getData("Cloudflare", "US"),
        getData("Spotify", "US"),
        getData("Binance", "UK")
    ]);
    const US = Cloudflare.concat(Spotify);
    const UK = Binance;
    console.log({ UK, US })
    fs.writeFileSync('./Clash/Rules/UK.yaml', yaml.stringify({ payload: UK }), 'utf8');
    fs.writeFileSync('./Clash/Rules/US.yaml', yaml.stringify({ payload: US }), 'utf8');
    return { UK, US };
}
otherrule()