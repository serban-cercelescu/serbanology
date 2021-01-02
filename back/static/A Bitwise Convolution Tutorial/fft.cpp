int rev(int x, int l) { // mirror the bits (e.g. 01011 -> 11010)
    int res = 0;
	for (int bit = 0; bit < l; ++bit) {
		res*= 2;
		res|= x & 1;
		x/= 2;
    }
	return res;
}
 
void fft(vector&lt;Complex&gt; &pol, int inverse = 1) {
    int n = size(pol);
	for (int i = 0; i < n; ++i)
		if (i < rev(i, log2[n]))
			swap(pol[i], pol[rev(i, log2[n])]);
	
	for (int step = 1; step < n; step*= 2) {
		Complex root;
        root.r = cos(inverse * PI / step); // real part
        root.i = sin(inverse * PI / step); // imaginary part
 
		for (int pos = 0; pos < n; pos+= step * 2) {
			Complex omega = 1;
			for (int i = 0; i < step; ++i) {
				Complex x = pol[pos + i];
				Complex y = pol[pos + i + step] * omega;
				omega*= root;
 
				pol[pos + i] = x + y;
				pol[pos + i + step] = x - y;
            }
        }
 
		if (inverse == -1)
			for (int i = 0; i < n; ++i)
				pol[i]*= 0.5;
    }
}