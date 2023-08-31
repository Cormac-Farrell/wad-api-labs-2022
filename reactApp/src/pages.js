export const Movies = () => {
    const context = useContext(MoviesContext);
    return <>
        <h2>Movies Data </h2>
        <div>
            {context.movies.results.map(movie => { return <>{movie.id},{movie.title}<br /></> })}
        </div>
    </>
}