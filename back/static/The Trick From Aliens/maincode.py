minbound = 0, maxbound = 1e18
while maxbound - minbound > 1e-6:
    λ = (maxbound - minbound) / 2
    #compute dp and aux for λ
    if cnt[n] <= k:
        minbound = λ
    else:
        maxbound = λ
#compute dp and cnt for the final λ
return dp[n] + cnt[n] * λ #note that if there are less than k positive values, then cnt[n] < k