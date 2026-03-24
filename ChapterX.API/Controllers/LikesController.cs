using ChapterX.Application.Likes.Commands;
using ChapterX.Application.Likes.Queries;
using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ChapterX.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikesController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILikesRepository _likesRepository;
        private readonly ILogger<LikesController> _logger;

        public LikesController(IMediator mediator, ILikesRepository likesRepository, ILogger<LikesController> logger)
        {
            _mediator = mediator;
            _likesRepository = likesRepository;
            _logger = logger;
        }

        [HttpGet("story/{storyId:int}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetByStory(int storyId)
        {
            var likes = await _likesRepository.GetByStoryIdAsync(storyId);
            return Ok(new { count = likes.Count(), userIds = likes.Select(l => l.UserId).ToList() });
        }

        [HttpDelete("user/{userId:int}/story/{storyId:int}")]
        [Authorize]
        public async Task<ActionResult> DeleteByUserAndStory(int userId, int storyId)
        {
            var deleted = await _likesRepository.DeleteByUserAndStoryAsync(userId, storyId);
            if (!deleted) return NotFound();
            return Ok();
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetAll()
        {
            _logger.LogInformation("Fetching all likes");
            var response = await _mediator.Send(new GetAllRequest());
            return Ok(response);
        }

        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById(int id)
        {
            _logger.LogInformation("Fetching like with ID: {LikeId}", id);
            var response = await _mediator.Send(new GetRequest(id));
            return Ok(response);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Add([FromBody] AddRequest request)
        {
            _logger.LogInformation("Adding a new like for StoryId: {StoryId}", request.StoryId);
            var exists = await _likesRepository.ExistsAsync(request.UserId, request.StoryId);
            if (exists) return Ok();
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<ActionResult> Update(int id, [FromBody] UpdateRequest request)
        {
            _logger.LogInformation("Updating like with ID: {LikeId}", id);
            if (id != request.Id)
            {
                return BadRequest("Route ID and body ID must match.");
            }

            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<ActionResult> Delete(int id)
        {
            _logger.LogInformation("Deleting like with ID: {LikeId}", id);
            var response = await _mediator.Send(new DeleteRequest(id));
            return Ok(response);
        }
    }
}

