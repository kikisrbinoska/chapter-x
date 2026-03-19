using MediatR;

namespace ChapterX.Application.Roles.Queries
{
    public record GetAllRequest() : IRequest<GetAllResponse>;
}
