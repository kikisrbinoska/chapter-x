using ChapterX.Application.Notification.Commands;
using ChapterX.Application.Notification.Queries;
using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ChapterX.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly INotificationRepository _notificationRepository;
        private readonly ILogger<NotificationsController> _logger;

        public NotificationsController(IMediator mediator, INotificationRepository notificationRepository, ILogger<NotificationsController> logger)
        {
            _mediator = mediator;
            _notificationRepository = notificationRepository;
            _logger = logger;
        }

        [HttpGet("user/{userId:int}")]
        [Authorize]
        public async Task<ActionResult> GetByUser(int userId)
        {
            var notifications = await _notificationRepository.GetByUserIdAsync(userId);
            var result = notifications.Select(n => new
            {
                id = n.Id,
                content = n.Content,
                isRead = n.IsRead,
                createdAt = n.CreatedAt,
                type = n.Type ?? "info",
                link = n.Link,
            });
            return Ok(result);
        }

        [HttpPut("{id:int}/read")]
        [Authorize]
        public async Task<ActionResult> MarkRead(int id)
        {
            var notification = await _notificationRepository.GetByIdAsync(id);
            if (notification == null) return NotFound();
            notification.IsRead = true;
            await _notificationRepository.UpdateAsync(notification);
            return Ok();
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetAll()
        {
            _logger.LogInformation("Fetching all notifications");
            var response = await _mediator.Send(new GetAllRequest());
            return Ok(response);
        }

        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById(int id)
        {
            _logger.LogInformation("Fetching notification with ID: {NotificationId}", id);
            var response = await _mediator.Send(new GetRequest(id));
            return Ok(response);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Add([FromBody] AddRequest request)
        {
            _logger.LogInformation("Adding a new notification");
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<ActionResult> Update(int id, [FromBody] UpdateRequest request)
        {
            _logger.LogInformation("Updating notification with ID: {NotificationId}", id);
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
            _logger.LogInformation("Deleting notification with ID: {NotificationId}", id);
            var response = await _mediator.Send(new DeleteRequest(id));
            return Ok(response);
        }
    }
}

