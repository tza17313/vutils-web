/**
 @description: 测试用例
 @date: 2018/6/7
 @author: 雷利(Rayleight@baie.com.cn)
 */

import * as common from '../lib/common'

test('isNumber(3)', () => {
    expect(common.isNumber(3)).toBe(true);
});
test('isNumber("3")', () => {
    expect(common.isNumber("3")).toBe(true);
});
test('isNumber("3)s"', () => {
    expect(common.isNumber("3s")).toBe(false);
});
test('isNumber(null)', () => {
    expect(common.isNumber(null)).toBe(false);
});
test('isNumber(undefined)', () => {
    expect(common.isNumber(undefined)).toBe(false);
});
test('isNumber({})', () => {
    expect(common.isNumber({})).toBe(false);
});

test('Date.format("yyyy-MM-dd hh:mm:ss")', () => {
    let temp=new Date(2018,6,6,6,6,6)
    expect(temp.Format("yyyy-MM-dd hh:mm:ss")).toMatch("2018-07-06 06:06:06")
});

test('isMobile(13456789098)', () => {
    expect(common.isMobile('13456789098')).toBe(true);
});

test('isMobile(134567890981)', () => {
    expect(common.isMobile('134567890981')).toBe(false);
});

test('isMobile(")xxx"', () => {
    expect(common.isMobile('xxx')).toBe(false);
});

test('isIdCard("330988199001013212")', () => {
    expect(common.isIdCard('330988199001013212')).toBe(true);
});

test('isIdCard("33098819900101321X")', () => {
    expect(common.isIdCard('33098819900101321X')).toBe(true);
});

test('isIdCard("33098819900101321x")', () => {
    expect(common.isIdCard('33098819900101321x')).toBe(true);
});

test('isIdCard("33098819900101321c")', () => {
    expect(common.isIdCard('33098819900101321c')).toBe(false);
});

test('isIdCard(")sdsdsdsdsd"', () => {
    expect(common.isIdCard('sdsdsdsdsd')).toBe(false);
});


test('isMobileCaptcha("123456")', () => {
    expect(common.isMobileCaptcha('123456')).toBe(true);
});

test('isMobileCaptcha("1234567")', () => {
    expect(common.isMobileCaptcha('1234567')).toBe(false);
});

test('isMobileCaptcha("12345")', () => {
    expect(common.isMobileCaptcha('12345')).toBe(false);
});

test('isMobileCaptcha("xxxxxx")', () => {
    expect(common.isMobileCaptcha('xxxxxx')).toBe(false);
});

test('currency(19)', () => {
    expect(common.currency(19)).toMatch("19.00");
});
test('currency(19.33333)', () => {
    expect(common.currency(19.33333)).toMatch("19.33");
});
test('currency(19.33933)', () => {
    expect(common.currency(19.33933)).toMatch("19.34");
});
test('currency(null)', () => {
    expect(common.currency(null)).toMatch("0.00");
});


test('toNumber("19.2223")', () => {
    expect(common.toNumber("19.2223")).toBe(19.2223);
});

test('toNumber("1s9.2223")', () => {
    expect(common.toNumber("1s9.2223")).toBe(0);
});

test('toNumber(null)', () => {
    expect(common.toNumber(null)).toBe(0);
});

test('toNumber(undefined)', () => {
    expect(common.toNumber(undefined)).toBe(0);
});


test('parseParam({a:1,b:2})', () => {
    expect(common.parseParam({a:1,b:2})).toMatch("a=1&b=2");
});

test('parseParam({a:"张三",b:2,c:false})', () => {
    expect(common.parseParam({a:"张三",b:2,c:false})).toMatch("a=%E5%BC%A0%E4%B8%89&b=2&c=false");
});

test('parseParam(undefined)', () => {
    expect(common.parseParam(undefined)).toBe("");
});


test('numberFormat(123456)', () => {
    expect(common.numberFormat(123456)).toBe("123,456");
});

test('numberFormat(123456.34)', () => {
    expect(common.numberFormat(123456.34)).toBe("123,456.34");
});

test('numberFormat(123456.3443,2)', () => {
    expect(common.numberFormat(123456.3443,2)).toBe("123,456.34");
});

test('numberFormat(123456.3443),2', () => {
    expect(common.numberFormat(123456,2)).toBe("123,456");
});