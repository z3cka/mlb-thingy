<template>
  <div>
    <h1>Who's gonna win?</h1>
    <div>
      <h2>Things to Do</h2>
      <ul>
        <li>[x] fetch games</li>
        <li>[x] list games</li>
        <li>[x] list scores</li>
        <li>[ ] list win probability</li>
      </ul>
      <h2>Today's Games</h2>
      <ul v-if="sched">
        <li
          v-for="game in sched.dates[0].games"
          :key="game.gamePk"
        >
          {{ parseGameTime(game.gameDate) }} — {{ game.teams.away.team.name }} ({{ game.teams.away.leagueRecord.wins }}-{{ game.teams.away.leagueRecord.losses }}), {{ game.teams.away.score }} @ {{ game.teams.home.team.name }}  ({{ game.teams.home.leagueRecord.wins }}-{{ game.teams.home.leagueRecord.losses }}), {{ game.teams.home.score }} — {{ game.status.abstractGameState }}, {{ game.linescore.inningState }} {{ game.linescore.currentInning }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'App',
  data() {
    return {
      currentDay: '',
      sched: null
    }
  },
  mounted () {
    let currentDay = dayjs().format('YYYY-MM-DD')
    this.getGames(currentDay)
  },
  methods: {
    async getGames(date) {
      try {
        const req = await fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=1,51&date=${date}&hydrate=linescore(matchup,runners)`)
        const res = await req.json()
        this.sched = res
        return res
      } catch (err) { // eslint-disable-next-line
        console.error(err)
      }
    },
    parseGameTime(gameDate) {
      const parsedGameTime = dayjs(gameDate).format('h:mm a')
      return parsedGameTime
    }
  },
}
</script>
