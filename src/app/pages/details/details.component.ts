import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

// Service
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private pokemonUrl: string = 'https://pokeapi.co/api/v2/pokemon'
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species'

  public pokemon : any
  public isLoading: Boolean = false
  public apiError: Boolean = false

  constructor(
    private activeRouter: ActivatedRoute,
    private pokeApiService: PokeApiService
  ) {}

  ngOnInit(): void {
    this.getPokemon()
  }

  public getPokemon() {
    const id = this.activeRouter.snapshot.params['id']
    const pokemon = this.pokeApiService.apiGetPokemons(`${this.pokemonUrl}/${id}`)
    const name = this.pokeApiService.apiGetPokemons(`${this.urlName}/${id}`)

    return forkJoin([pokemon, name]).subscribe({
      next: (res) => {
        this.pokemon = res
        this.isLoading = true
      },
      error: (err) => {
        this.apiError = true
      }
    })

  }
}
