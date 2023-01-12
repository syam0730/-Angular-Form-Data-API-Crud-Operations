import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { DistrictComponent } from './district/district.component';
import { PreviewdataComponent } from './previewdata/previewdata.component';
import { StateComponent } from './state/state.component';

const routes: Routes = [
  { path: 'address', component: AddressComponent },
  { path: 'state', component: StateComponent},
  { path: 'district', component: DistrictComponent },
  { path: 'previewdata', component: PreviewdataComponent }
  // { path: 'address', component: AddressComponent, children: [{ path: 'state', component: StateComponent, children: [{ path: 'district', component: DistrictComponent }] }] }
  // { path: 'address', component: AddressComponent, children: [{ path: 'district', component: DistrictComponent }] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
