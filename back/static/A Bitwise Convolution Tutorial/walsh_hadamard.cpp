void transform(vector&lt;double&gt; &pol) {
    int n = size(pol);
	
	for (int step = 1; step < n; step*= 2) { 
		for (int pos = 0; pos < n; pos+= step * 2) {
			for (int i = 0; i < len; ++i) {
                // replace values pol[pos + i] pol[pos + 1 + step] with their product with T_2
				double a = pol[pos + i];
				double b = pol[pos + i + step];
				pol[pos + i] = w * a + x * b;
				pol[pos + i + step] = y * a + z * b;
            }
        }
    }
}

void inverse_transform(vector&lt;double&gt; &pol) {
	const double determinant = w * z - x * y;
    int n = size(pol);

	for (int step = 1; step < n; step*= 2) { 
		for (int pos = 0; pos < n; pos+= step * 2) {
			for (int i = 0; i < len; ++i) {
                // replace values pol[pos + i] pol[pos + 1 + step] with their product with the inverse of T_2
				double a = pol[pos + i];
				double b = pol[pos + i + step];
				pol[pos + i] = (z * a - y * b) / determinant;
				pol[pos + i + step] = (w * b - x * a) / determinant;
            }
        }
    }
}