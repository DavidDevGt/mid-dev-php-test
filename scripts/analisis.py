import pandas as pd

df_productos = pd.read_csv('productos_1000.csv')

precio_promedio = df_productos['precio'].mean()
print(f"Promedio: Q{precio_promedio:.2f}")

producto_stock_mayor = df_productos.loc[df_productos['stock'].idxmax()]
print(f"Producto con mayor stock: {producto_stock_mayor['nombre']}")

total_productos = len(df_productos)
print(f"Total de productos: {total_productos}")


