module.exports = {
    sum: (a, b) => a + b,
    times: (n, block) => {
        var accum = '';
        for(var i = 1; i <= n; ++i)
            accum += block.fn(i);
        return accum;
    }
  };