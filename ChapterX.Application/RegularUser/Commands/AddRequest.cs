using MediatR;

namespace ChapterX.Application.RegularUser.Commands
{
    public record AddRequest(int UserId) : IRequest<AddResponse>;
}
