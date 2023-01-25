import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, MenuItem, PrimeNGConfig } from 'primeng/api';
import { RestService } from '../rest.service';
interface Car {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  image?: string;
}

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css'],
})
export class Page1Component implements OnInit {
  @ViewChild('dt') excel: any;

  customers: any;
  datasource: any;
  totalRecords: number | any;
  loading: boolean = true;
  cars: any;
  items!: MenuItem[];
  responsiveOptions;
  col: any;
  exportColumns: any;

  ProductList: any = [];
  selectedProduct: any;
  filteredCountries: any;

 
  constructor(private rest: RestService, private primengConfig: PrimeNGConfig) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
    this.getData6();
  }

  ngOnInit(): void {
    //lazy loading
    this.rest.getCustomersLarge().subscribe({
      next: (data: string | any[]) => {
        this.datasource = data;
        this.totalRecords = data.length;
        // this.loading = false;
      },
      error: (err: string | any[]) => {
        console.log(err);
      },
      complete: () => {
        this.loading = false;
      },
    });
    //lazy load ends

    this.col = [
      { header: ' ID', field: 'menu_id' },
      { header: ' Menuname', field: 'menuname' },
      { header: 'Module_id', field: 'module_id' },
      { header: 'Modulename', field: 'modulename' },
      { header: 'Menugroup_type', field: 'menugroup_type' },
      { header: 'Menugrouptypename', field: 'menugrouptypename' },
      { header: 'Childnodeflag_type', field: 'childnodeflag_type' },
      { header: 'Childnodeflagtypename', field: 'childnodeflagtypename' },
      { header: 'Activestatus_type', field: 'activestatus_type' },
      { header: 'Activestatustypename', field: 'activestatustypename' },
      { header: 'Interfaces_id', field: 'interfaces_id' },
      { header: 'Interfacesname', field: 'interfacesname' },
      { header: 'Parentmenu_id', field: 'parentmenu_id' },
      { header: 'Parentmenuname', field: 'parentmenuname' },
      { header: 'Priorityno', field: 'priorityno' },
      { header: 'Menuicon', field: 'menuicon' },
      { header: 'Createby_id', field: 'createby_id' },
      { header: 'Createmachineid', field: 'createmachineid' },
      { header: 'Updateby_id', field: 'updateby_id' },
      { header: 'Updatemachineid', field: 'updatemachineid' },
      { header: 'Createdatetime', field: 'createdatetime' },
      { header: 'Updatedatetime', field: 'updatedatetime' },
    ];

    //download api data in exce file
    this.exportColumns = this.col.map((col: { header: any; field: any }) => ({
      title: col.header,
      dataKey: col.field,
    }));
    //download api data in exce file end

    //data fetch from api start
    this.rest.getDetail().subscribe((res) => {
      this.customers = res;
    });
    //data fetch from api end

    //menubar start
    this.items = [
      {
        label: 'File',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            items: [
              {
                label: 'Bookmark',
                icon: 'pi pi-fw pi-bookmark',
              },
              {
                label: 'Video',
                icon: 'pi pi-fw pi-video',
              },
            ],
          },
          {
            label: 'Download Pdf',
            icon: 'pi pi-file-pdf',
            command: () => this.exportPdf(),
          },
          {
            separator: true,
          },
          {
            label: 'Download excel',
            icon: 'pi pi-file-excel',
            command: () => this.excel.exportCSV(),
          },
        ],
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {
            label: 'Left',
            icon: 'pi pi-fw pi-align-left',
          },
          {
            label: 'Right',
            icon: 'pi pi-fw pi-align-right',
          },
          {
            label: 'Center',
            icon: 'pi pi-fw pi-align-center',
          },
          {
            label: 'Justify',
            icon: 'pi pi-fw pi-align-justify',
          },
        ],
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus',
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-user-minus',
          },
          {
            label: 'Search',
            icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Filter',
                icon: 'pi pi-fw pi-filter',
                items: [
                  {
                    label: 'Print',
                    icon: 'pi pi-fw pi-print',
                  },
                ],
              },
              {
                icon: 'pi pi-fw pi-bars',
                label: 'List',
              },
            ],
          },
        ],
      },
      {
        label: 'Events',
        icon: 'pi pi-fw pi-calendar',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'Save',
                icon: 'pi pi-fw pi-calendar-plus',
              },
              {
                label: 'Delete',
                icon: 'pi pi-fw pi-calendar-minus',
              },
            ],
          },
          {
            label: 'Archieve',
            icon: 'pi pi-fw pi-calendar-times',
            items: [
              {
                label: 'Remove',
                icon: 'pi pi-fw pi-calendar-minus',
              },
            ],
          },
        ],
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
        routerLink: '/home',
      },
    ];
    //menubar end

    //carousel
    this.cars = [
      {
        id: '1',
        name: 'Bugatti',
        description: 'Racing car',
        price: 1800,
        image: 'assets/backg.jpg',
      },
      {
        id: '2',
        name: 'Ferrari',
        description: 'The Prancing Horse',
        price: 1500,
        image: 'assets/backg.jpg',
      },
      {
        id: '3',
        name: 'Porsche',
        description: 'Full spectrum',
        price: 10000,
        image: 'assets/backg.jpg',
      },
      {
        id: '4',
        name: 'Bugatti',
        description: 'Racing car',
        price: 2800,
        image: 'assets/backg.jpg',
      },
      {
        id: '5',
        name: 'Ferrari',
        description: 'The Prancing Horse',
        price: 31500,
        image: 'assets/backg.jpg',
      },
      {
        id: '6',
        name: 'Porsche',
        description: 'Full spectrum',
        price: 50000,
        image: 'assets/backg.jpg',
      },
      {
        id: '7',
        name: 'Bugatti',
        description: 'Racing car',
        price: 4800,
        image: 'assets/backg.jpg',
      },
      {
        id: '8',
        name: 'Ferrari',
        description: 'The Prancing Horse',
        price: 31500,
        image: 'assets/backg.jpg',
      },
      {
        id: '9',
        name: 'Porsche',
        description: 'Full spectrum',
        price: 45650,
        image: 'assets/backg.jpg',
      },
    ];
  }
  getData6() {
    this.rest.getProducts().subscribe((response) => {
      this.ProductList = response;
    });
  }
  search(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.ProductList.length; i++) {
      let country = this.ProductList[i];
      if (country.menuname.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
  }
  exportPdf() {
    // const doc = new jsPDF('p', 'pt', 'A1');
    // const doc = new jsPDF('l', 'mm', 'a4');
    // (doc as any).autoTable(this.exportColumns, this.customers);
    // doc.save('EntryDetails.pdf');
  }
  //lazy load

  loadCustomers(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      if (this.datasource && event.first && event.rows) {
        this.customers = this.datasource.slice(
          event.first,
          event.first + event.rows
        );
        this.loading = false;
      } else {
        this.loading = false;
      }
    }, 1000);
  } // lazy load
}
