import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  private setAllPokemon: any
  public getAllPokemon: any
  public apiError: Boolean = false

  constructor (
    private pokeApiService: PokeApiService
  ) {}

  ngOnInit(): void {
    this.pokeApiService.apiListAllPokemons.subscribe({
      next: (res) => {
        this.setAllPokemon = res.results
        this.getAllPokemon = this.setAllPokemon
      },
      error: (err) => {
        this.apiError = true
      }
    })
  }

  public getSearch (value: string) {
    const filter = this.setAllPokemon.filter((poke: any) => {
      return !poke.name.indexOf(value.toLocaleLowerCase())
    })
    this.getAllPokemon = filter
  }


}
