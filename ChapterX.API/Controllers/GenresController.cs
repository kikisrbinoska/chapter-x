using ChapterX.Application.Genre.Commands;
using ChapterX.Application.Genre.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ChapterX.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenresController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger<GenresController> _logger;

        public GenresController(IMediator mediator, ILogger<GenresController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        // GET: api/Genres
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetAll()
        {
            _logger.LogInformation("Fetching all genres");
            var response = await _mediator.Send(new GetAllRequest());
            return Ok(response);
        }

        // GET: api/Genres/5
        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById([FromRoute] int id)
        {
            _logger.LogInformation("Fetching genre with ID: {GenreId}", id);
            var response = await _mediator.Send(new GetRequest(id));
            return Ok(response);
        }

        // POST: api/Genres
        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Add([FromBody] AddRequest request)
        {
            _logger.LogInformation("Adding a new genre with Name: {GenreName}", request.Name);
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        // PUT: api/Genres/5
        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<ActionResult> Update([FromRoute] int id, [FromBody] UpdateRequest request)
        {
            _logger.LogInformation("Updating genre with ID: {GenreId}", id);
            if (id != request.Id)
            {
                return BadRequest("Route ID and body ID must match.");
            }

            var response = await _mediator.Send(request);
            return Ok(response);
        }

        // DELETE: api/Genres/5
        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            _logger.LogInformation("Deleting genre with ID: {GenreId}", id);
            var response = await _mediator.Send(new DeleteRequest(id));
            return Ok(response);
        }
    }
}

