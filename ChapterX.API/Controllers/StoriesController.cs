using ChapterX.Application.Story.Commands;
using ChapterX.Application.Story.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Security.Claims;

namespace ChapterX.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoriesController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger<StoriesController> _logger;

        public StoriesController(IMediator mediator, ILogger<StoriesController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        // GET: api/Stories
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetAll([FromQuery] GetAllRequest request)
        {
            _logger.LogInformation("Fetching all stories");
            var response = await _mediator.Send(request);
            var stories = response.Stories.Select(s => new
            {
                id = s.Id,
                userId = s.UserId,
                title = s.Title,
                shortDescription = s.ShortDescription,
                image = s.Image,
                content = s.Content,
                matureContent = s.MatureContent,
                createdAt = s.CreatedAt,
                updatedAt = s.UpdatedAt,
                writer = s.Writer == null ? null : new { user = s.Writer.User == null ? null : new { username = s.Writer.User.Username } },
                hasGenres = s.HasGenres.Select(hg => new { genre = new { name = hg.Genre?.Name ?? "" } }),
                likes = s.Likes.Select(l => new { userId = l.UserId }),
                comments = s.Comments.Select(c => new { id = c.Id }),
                chapters = s.Chapters.Select(c => new { id = c.Id, viewCount = c.ViewCount }),
            });
            return Ok(new { stories });
        }

        // GET: api/Stories/5
        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById([FromRoute] int id)
        {
            _logger.LogInformation("Fetching story with ID: {StoryId}", id);
            var response = await _mediator.Send(new GetRequest(id));
            if (response.Story == null) return NotFound();
            var s = response.Story;
            return Ok(new
            {
                id = s.Id,
                userId = s.UserId,
                title = s.Title,
                shortDescription = s.ShortDescription,
                image = s.Image,
                content = s.Content,
                matureContent = s.MatureContent,
                createdAt = s.CreatedAt,
                updatedAt = s.UpdatedAt,
                writer = s.Writer == null ? null : new { user = s.Writer.User == null ? null : new { username = s.Writer.User.Username } },
                hasGenres = s.HasGenres.Select(hg => new { genre = new { name = hg.Genre?.Name ?? "" } }),
                likes = s.Likes.Select(l => new { userId = l.UserId }),
                comments = s.Comments.Select(c => new { id = c.Id }),
                chapters = s.Chapters.Select(c => new { id = c.Id, viewCount = c.ViewCount }),
            });
        }

        // POST: api/Stories
        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Add([FromBody] AddRequest request)
        {
            var callerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            _logger.LogInformation("Adding a new story for UserId: {UserId}", callerId);
            var response = await _mediator.Send(request with { UserId = callerId });
            return Ok(response);
        }

        // PUT: api/Stories/5
        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<ActionResult> Update([FromRoute] int id, [FromBody] UpdateRequest request)
        {
            _logger.LogInformation("Updating story with ID: {StoryId}", id);
            if (id != request.Id)
            {
                return BadRequest("Route ID and body ID must match.");
            }

            var callerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var response = await _mediator.Send(request with { CallerId = callerId });
            return Ok(response);
        }

        // DELETE: api/Stories/5
        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            _logger.LogInformation("Deleting story with ID: {StoryId}", id);
            var callerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var isAdmin = User.IsInRole("Admin");
            var response = await _mediator.Send(new DeleteRequest(id, callerId, isAdmin));
            return Ok(response);
        }
    }
}

