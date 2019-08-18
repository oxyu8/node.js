const {createObjectCsvWriter} = require('csv-writer');
const csvfilepath = __dirname+`/shizuoka.csv`
const csvWriter = createObjectCsvWriter({
path: csvfilepath,
header: [
    {id: `name`, title: `NAME`},
    {id: `address`, title: `ADDRESS`},
    {id: `pic`, title: `PIC`},
    {id: `detailTitle`, title: `DETAILTITLE`},
    {id: `detailContent`, title: `DETAILCONTENT`},
    {id: `phoneNumber`, title: `PHONENUMBER`}
],
encording:'utf8',
append:false,
});

const puppeteer = require('puppeteer');


(async () => {
    const browser = await puppeteer.launch({
    heaadless: false,
    slowMo: 250,
    devtools: true
});
    url = ["https://www.its-mo.com/c/静岡%20名所・百選・100選/22_0200000000:0200400000/",
            "https://www.its-mo.com/c/%E9%9D%99%E5%B2%A1%20%E5%90%8D%E6%89%80%E3%83%BB%E7%99%BE%E9%81%B8%E3%83%BB100%E9%81%B8/22_0200000000:0200400000/1/",
            "https://www.its-mo.com/c/%E9%9D%99%E5%B2%A1%20%E5%90%8D%E6%89%80%E3%83%BB%E7%99%BE%E9%81%B8%E3%83%BB100%E9%81%B8/22_0200000000:0200400000/2/",
            "https://www.its-mo.com/c/%E9%9D%99%E5%B2%A1%20%E5%90%8D%E6%89%80%E3%83%BB%E7%99%BE%E9%81%B8%E3%83%BB100%E9%81%B8/22_0200000000:0200400000/3/",
            "https://www.its-mo.com/c/%E9%9D%99%E5%B2%A1%20%E5%90%8D%E6%89%80%E3%83%BB%E7%99%BE%E9%81%B8%E3%83%BB100%E9%81%B8/22_0200000000:0200400000/4/"];

    page = await browser.newPage();
    try{
    for(h = 0; h < 5; h ++){
        await page.goto(url[h]);
        for (let i = 0; i < 20; i ++) {
//#wrap-era > div.content > div.con-List-area > ul > li:nth-child(1)
        const goPage = await page.$$('.con-List-area ul li');
            let titleUrl = await goPage[i].$eval('a', e => e.href);
            await page.goto(titleUrl);

        const addSelector = 'h2.conGrayttl a';
        const selectorAddress = `#wrap-era > div.content > div.DetailGrayttl > div.addressBox.colNormal > p`
        const selectorPic = `#wrap-era > div.content > div.cp-info > div > div.detail-con > div > img`
        const selectordetailTitle = `#wrap-era > div.content > div.cp-info > div > div.detail-con > p > strong`
        const selectordetailContent = `#wrap-era > div.content > div.cp-info > div > div.detail-con > p.detail-con-txt`
        const selectorPhone = `#wrap-era > div.content > div.cp-info > div > table:nth-child(4) > tbody > tr:nth-child(3) > th`
    
        await page.waitForSelector(addSelector);
        await page.waitForSelector(selectorAddress);
        await page.waitForSelector(selectorPic);
        await page.waitForSelector(selectordetailTitle);
        await page.waitForSelector(selectordetailContent);
        await page.waitForSelector(selectorPhone);
    
        const scripingName = await page.evaluate(addSelector => {
        const data = document.querySelector(addSelector);
        const address = data.textContent;
        return address;
    }, addSelector);
    
    const scripingAddress = await page.evaluate(selectorAddress => {
        const data2 = document.querySelector(selectorAddress);
        const address2 = data2.textContent;
            return address2;
    }, selectorAddress);

    const scripingPic = await page.evaluate(selectorPic => {
        const data3 = document.querySelector(selectorPic);
        const address3 = data3.src;
            return address3;
    }, selectorPic);
    
    const scripingDetailTitle = await page.evaluate(selectordetailTitle => {
        const data4 = document.querySelector(selectordetailTitle);
        const address4 = data4.textContent;
            return address4;
    }, selectordetailTitle);

    const scripingDetailContent = await page.evaluate(selectordetailContent => {
        const data5 = document.querySelector(selectordetailContent);
        const address5 = data5.textContent;
            return address5;
    }, selectordetailContent);
    
    
    let scripingPhone = await page.evaluate(selectorPhone => {
        const data6 = document.querySelector(selectorPhone);
        const address6 = data6.textContent;
        if(address6 == "電話番号") {
            const phoneNumber = document.querySelector('#wrap-era > div.content > div.cp-info > div > table:nth-child(4) > tbody > tr:nth-child(3) > td > span');
            scdata6 = phoneNumber.textContent;
        } else {
            scdata6 = "";
        }
            return scdata6;
    }, selectorPhone);
    
    var record = {name: scripingName, address: scripingAddress, pic: scripingPic, detailTitle: scripingDetailTitle, detailContent: scripingDetailContent, phoneNumber: scripingPhone};
    
    console.log(record);

    await page.goBack();
    let records = [record];

    csvWriter.writeRecords(records)
        .then(() => {
            console.log("success");
        });
    }
    }
    } catch (err) {
        console.log(err);
    } finally {
        await browser.close();
    }

})();



