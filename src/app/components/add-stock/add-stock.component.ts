import { StoresService } from './../../services/stores/stores.service';
import { StocksService } from './../../services/stocks/stocks.service';
import { Stores } from './../../models/stores';
import { Stock } from './../../models/stock';
import { DetalleService } from './../../services/detalle.service';
import { Ventas } from './../../models/ventas';
import { DetalleVenta } from './../../models/detalleVenta';
import { VentasService } from './../../services/sales/ventas.service';
import { ClienteService } from 'src/app/services/clients/cliente.service';
import { Cliente } from './../../models/cliente';
import { ProductosService } from './../../services/products/productos.service';
import { Producto } from './../../models/producto';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {

  cantidad!: number;
  id!: number;
  myform!: FormGroup;
  options: Producto[] = [];
  filteredOptions!: Observable<Producto[]>;
  myControl = new FormControl('');
  producto!: Producto;
  detalles: DetalleVenta[] = [];
  _venta!: Ventas;
  stock!: Stock;

  constructor(private formBuilder: FormBuilder,
    private activated: ActivatedRoute, private productoService: ProductosService,
    private stockService: StocksService) { }

  ngOnInit(): void {
    this.id = this.activated.snapshot.params['id'];
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''), map(value => this._filter(value || '')),
    );
    this.reactiveForm();
    this.getProductos();
  }

  getProductos() {
    this.productoService.getProductos().subscribe(
      (data: Producto[]) => {
        this.options = data;
      }
    )
  }
  conseguirProducto(data: any) {
    this.producto = data;
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.productName.toLowerCase().includes(filterValue));
  }
  reactiveForm() {
    this.myform = this.formBuilder.group({
      fecha_exp: ["", [Validators.required]],
      fecha_shop: ["", [Validators.required]]
    })
  }
  
 
  addStock() {

    let _store: Stores={
      id:this.id,
      storeName: '',
      noRuc:'',
      noPhone:'',
      ownerName: '',
      ownerLastName: '',
      ownerPhoto: '',
      ownerDni: '',
      email: '',
      password: '',
      city: ''
    } 


    let stock: Stock = {
      id: 999999,
      noUnits: this.myform.get('noUnits')?.value,
      pricePerUnit: this.myform.get('pricePerUnit')?.value,
      dateExpiration: this.myform.get('dateExpiration')?.value,
      dateShopping: this.myform.get('dateShopping')?.value,
      store: _store,
      product: this.producto 
   
    }
/*
    this.stockService.addStock(stock).subscribe({

      next: (data: Stock) => {
        console.log('añadiendo stock: ', data);
        
        this.stockService.addStock(this.detalles).subscribe({
          next: (data: Stock) => {
            this.router.navigate(['dashboard/'+this.id+'/ventas']);
          },
          error: e => console.log('error detalle: ', e)
        })
      },
      error: e => console.log('error venta: ' + e)


    });*/

  }  
}
