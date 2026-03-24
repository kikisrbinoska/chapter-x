using ChapterX.Application.Collaboration.Commands;
using ChapterX.Application.Collaboration.Queries;
using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ChapterX.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CollaborationsController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ICollaborationRepository _collaborationRepository;
        private readonly ILogger<CollaborationsController> _logger;

        public CollaborationsController(IMediator mediator, ICollaborationRepository collaborationRepository, ILogger<CollaborationsController> logger)
        {
            _mediator = mediator;
            _collaborationRepository = collaborationRepository;
            _logger = logger;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetAll()
        {
            _logger.LogInformation("Fetching all collaborations");
            var collabs = await _collaborationRepository.GetAllAsync();
            var result = collabs.Select(c => new
            {
                id = c.Id,
                userId = c.UserId,
                storyId = c.StoryId,
                username = c.User != null ? c.User.Username : "",
                name = c.User != null ? c.User.Name : "",
                createdAt = c.CreatedAt,
            });
            return Ok(result);
        }

        [HttpDelete("user/{userId:int}/story/{storyId:int}")]
        [Authorize]
        public async Task<ActionResult> DeleteByUserAndStory(int userId, int storyId)
        {
            var deleted = await _collaborationRepository.DeleteByUserAndStoryAsync(userId, storyId);
            if (!deleted) return NotFound();
            return Ok();
        }

        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById(int id)
        {
            _logger.LogInformation("Fetching collaboration with ID: {CollaborationId}", id);
            var response = await _mediator.Send(new GetRequest(id));
            return Ok(response);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Add([FromBody] AddRequest request)
        {
            _logger.LogInformation("Adding a new collaboration");
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<ActionResult> Update(int id, [FromBody] UpdateRequest request)
        {
            _logger.LogInformation("Updating collaboration with ID: {CollaborationId}", id);
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
            _logger.LogInformation("Deleting collaboration with ID: {CollaborationId}", id);
            var response = await _mediator.Send(new DeleteRequest(id));
            return Ok(response);
        }
    }
}

