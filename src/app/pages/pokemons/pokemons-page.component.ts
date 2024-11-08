import { ApplicationRef, ChangeDetectionStrategy, Component, effect, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces/simple-pokemon.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [
    PokemonListComponent,
    PokemonListSkeletonComponent,
    RouterLink
  ],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent {

  private pokemonsService = inject(PokemonsService)
  public pokemons: WritableSignal<SimplePokemon[]> = signal<SimplePokemon[]>([])

  private route = inject(ActivatedRoute);
  private router = inject(Router)
  private title = inject(Title)


  public currentPage = toSignal<number>(
    this.route.params.pipe(
      tap(() => console.log('cambia valor current page')),
      map((params) => params['page'] ?? '1'),
      map(page => (isNaN(+page)) ? 1 : +page),
      map(page => Math.max(1, page))

    )
  )

  public loadOnPageChanged = effect(() => {
    console.log('currentPage', this.currentPage())
    this.loadPokemons(this.currentPage())
  }, { allowSignalWrites: true })

  // public isLoading: WritableSignal<boolean> = signal(true);
  // private appRef = inject(ApplicationRef);

  // private $appState = this.appRef.isStable.subscribe(isStable => {
  //   console.log({ isStable });
  // })


  // ngOnInit(): void {
  //   // this.route.queryParamMap.subscribe(console.log)
  //   this.loadPokemons()
  //   // setTimeout(() => {
  //   //   this.isLoading.set(false);
  //   // }, 5000);
  // }

  public loadPokemons(page = 0) {

    this.pokemonsService.loadPage(page)
      .pipe(
        // tap(() => this.router.navigate([], {queryParams: {page: pageToLoad}})),
        tap(() => this.title.setTitle(`Pokemons SSR - Page ${page}`)),
      )
      .subscribe(pokemons => {
        this.pokemons.set(pokemons);
      })
  }



  // ngOnDestroy(): void {
  //   this.$appState.unsubscribe();
  // }
}
