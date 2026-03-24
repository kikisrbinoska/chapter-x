using ChapterX.Application.ReadingList.Commands;
using ChapterX.Application.ReadingList.Queries;
using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ChapterX.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReadingListsController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IReadingListRepository _readingListRepository;
        private readonly ILogger<ReadingListsController> _logger;

        public ReadingListsController(IMediator mediator, IReadingListRepository readingListRepository, ILogger<ReadingListsController> logger)
        {
            _mediator = mediator;
            _readingListRepository = readingListRepository;
            _logger = logger;
        }

        [HttpGet("user/{userId:int}")]
        [Authorize]
        public async Task<ActionResult> GetByUser(int userId)
        {
            _logger.LogInformation("Fetching reading lists for user {UserId}", userId);
            var lists = await _readingListRepository.GetByUserIdAsync(userId);
            var result = lists.Select(l => MapList(l));
            return Ok(result);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetAll()
        {
            _logger.LogInformation("Fetching all reading lists");
            var lists = await _readingListRepository.GetAllAsync();
            var result = lists.Select(l => MapList(l));
            return Ok(result);
        }

        private static object MapList(Domain.Entities.ReadingList l) => new
        {
            id = l.Id,
            name = l.Name,
            content = l.Content,
            isPublic = l.IsPublic,
            userId = l.UserId,
            createdAt = l.CreatedAt,
            username = l.User?.Username ?? "",
            readingListItems = l.ReadingListItems.Select(i => new
            {
                listId = i.ListId,
                storyId = i.StoryId,
                addedAt = i.AddedAt,
                storyTitle = i.Story?.ShortDescription ?? "",
                authorUsername = i.Story?.Writer?.User?.Username ?? "",
                genres = i.Story?.HasGenres.Select(hg => hg.Genre?.Name).Where(n => n != null).ToList() ?? []
            }).ToList()
        };

        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById(int id)
        {
            _logger.LogInformation("Fetching reading list with ID: {ReadingListId}", id);
            var response = await _mediator.Send(new GetRequest(id));
            return Ok(response);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Add([FromBody] AddRequest request)
        {
            _logger.LogInformation("Adding a new reading list with Name: {ReadingListName}", request.Name);
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<ActionResult> Update(int id, [FromBody] UpdateRequest request)
        {
            _logger.LogInformation("Updating reading list with ID: {ReadingListId}", id);
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
            _logger.LogInformation("Deleting reading list with ID: {ReadingListId}", id);
            var response = await _mediator.Send(new DeleteRequest(id));
            return Ok(response);
        }
    }
}

